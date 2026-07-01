from pathlib import Path
import re
import sys
import time

root = Path(__file__).resolve().parent.parent
posts_dir = root / 'blog updates'
output_file = posts_dir / 'posts.js'


def extract_meta(content: str, name: str) -> str:
    match = re.search(rf'<meta\s+name="{re.escape(name)}"\s+content="([^"]*)"', content, re.IGNORECASE)
    return match.group(1).strip() if match else ''


def collect_posts() -> list[dict]:
    html_files = sorted(
        [p for p in posts_dir.glob('*.html') if p.name != 'posts.js'],
        key=lambda p: p.name.lower(),
    )
    posts = []
    for file_path in html_files:
        content = file_path.read_text(encoding='utf-8')
        title_value = extract_meta(content, 'blog-title')
        title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
        title_text = title_value or (title_match.group(1).strip() if title_match else file_path.stem.replace('-', ' ').title())
        date = extract_meta(content, 'blog-date') or '1970-01-01'
        tags = [tag.strip() for tag in extract_meta(content, 'blog-tags').split(',') if tag.strip()]
        excerpt = extract_meta(content, 'blog-excerpt') or ''
        hidden = extract_meta(content, 'blog-hidden').lower() == 'true'
        if not hidden:
            posts.append({
                'title': title_text,
                'date': date,
                'tags': tags,
                'excerpt': excerpt,
                'link': f'blog updates/{file_path.name}',
            })

    posts.sort(key=lambda item: item['date'], reverse=True)
    return posts


def write_posts_file(posts: list[dict]) -> None:
    output = 'window.BLOG_POSTS = ' + __import__('json').dumps(posts, indent=2) + ';\n'
    output_file.write_text(output, encoding='utf-8')


def watch_for_changes() -> None:
    known_files = {p.name: p.stat().st_mtime for p in posts_dir.glob('*.html') if p.name != 'posts.js'}
    print(f'Watching {posts_dir.relative_to(root)} for new blog pages...')
    while True:
        current_files = {p.name: p.stat().st_mtime for p in posts_dir.glob('*.html') if p.name != 'posts.js'}
        if current_files != known_files:
            changed = sorted(set(current_files) | set(known_files) - set(current_files))
            if changed:
                print(f'Detected blog page changes: {", ".join(changed)}')
            posts = collect_posts()
            write_posts_file(posts)
            print(f'Generated {len(posts)} blog post entries at {output_file.relative_to(root)}')
            known_files = current_files
        time.sleep(2)


if __name__ == '__main__':
    if '--watch' in sys.argv:
        watch_for_changes()
    else:
        posts = collect_posts()
        write_posts_file(posts)
        print(f'Generated {len(posts)} blog post entries at {output_file.relative_to(root)}')
