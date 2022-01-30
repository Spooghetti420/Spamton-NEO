import re
import os

new_content = ""
with open("index.html", encoding="utf-8", mode="r") as index:
    content = index.read()

    javascript_files = []
    for root, directory, files in os.walk("src"):
        for file in files:
            if file.endswith(".ts"):
                if root.startswith("src"):
                    root = "dist" + root[3:]
                file = file[:-3] + ".js"
                javascript_files.append(os.path.join(root, file))

    script_tags = "    " + "\n    ".join([f'<script src="{file}"></script>' for file in javascript_files])
    
    pattern = r"(?<=!-- Start script section -->\n)[\s\S]*(?=\n +<!-- End script section -->)"
    new_content = re.sub(pattern, script_tags, content)

with open("index.html", encoding="utf-8", mode="w") as index:
    index.write(new_content)
