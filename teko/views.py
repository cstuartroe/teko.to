from django.shortcuts import render
from django.http import StreamingHttpResponse, HttpRequest
import subprocess
import json


def react_index(request):
    return render(request, 'react_index.html')


def stream(teko_content: str):
    process = subprocess.Popen(["./tekolang", "-c", teko_content], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

    for i, line in enumerate(iter(lambda: process.stdout.readline(), b'')):
        yield line

        if i >= 100:
            yield "Process killed.\n"
            break


def create_run(request: HttpRequest):
    if request.method == "POST":
        body = json.loads(request.body.decode())
        return StreamingHttpResponse(stream(body["contents"]))
