"""
This script is intended to add all necessary JavaScript dependencies from the source tree into the
`index.html` file. It simply regexes out all of the existing script tags and replaces them with the necessary ones.
The reason it checks the `src` directory and goes to the trouble of replacing `src` with `dist` and `.ts` with 
`.js` is that the `dist` directory can become bloated with old files over time, and deleting them can be a pain
without the right automation. This is the easiest way to only copy the files that'll be used in the build
and not worry about junk JavaScript files. 
"""

import re
import os
import subprocess

subprocess.run(["tsc"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL) # Ensure project is compiled
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
