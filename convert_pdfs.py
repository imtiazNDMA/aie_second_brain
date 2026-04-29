#!/usr/bin/env python3
"""
Convert all PDF files in raw/source/ to Markdown (.md) files in raw/inbox/
so they can be ingested by the second-brain-ingest workflow.
"""

import sys
from pathlib import Path

try:
    import pdfplumber
except ImportError:
    print("Error: pdfplumber not installed. Install with: pip install pdfplumber")
    sys.exit(1)

SOURCE_DIR = Path("raw/source")
INBOX_DIR = Path("raw/inbox")
INBOX_DIR.mkdir(parents=True, exist_ok=True)

def pdf_to_md(pdf_path: Path, md_path: Path):
    """Extract text from PDF and save as Markdown."""
    print(f"Processing {pdf_path.name} -> {md_path.name}")
    text_content = []
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages, start=1):
            text = page.extract_text()
            if text:
                # Optional: add page separator
                text_content.append(f"## Page {i}\n\n{text}\n")
            else:
                text_content.append(f"## Page {i}\n\n[No extractable text]\n")
    md_text = "\n".join(text_content)
    md_path.write_text(md_text, encoding="utf-8")
    print(f"Saved {md_path}")

def main():
    pdf_files = list(SOURCE_DIR.glob("*.pdf"))
    if not pdf_files:
        print(f"No PDF files found in {SOURCE_DIR}")
        return
    for pdf_file in pdf_files:
        md_file = INBOX_DIR / (pdf_file.stem + ".md")
        pdf_to_md(pdf_file, md_file)

if __name__ == "__main__":
    main()