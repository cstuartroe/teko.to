import subprocess
import json
import resource

from django.shortcuts import render
from django.http import StreamingHttpResponse, HttpRequest, JsonResponse
from django.conf import settings

from .lib.lessons import load_lessons

MAX_MEMORY = 2**30  # 1GB
MAX_OUTPUT_LINES = 200 if settings.DEBUG else 10000

resource.setrlimit(resource.RLIMIT_AS, (MAX_MEMORY, MAX_MEMORY))


def react_index(request: HttpRequest):
    return render(request, 'react_index.html')


def stream(teko_content: str):
    process = subprocess.Popen(["./tekolang", "-c", teko_content], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

    for i, line in enumerate(iter(lambda: process.stdout.readline(), b'')):
        if line.startswith(b'runtime: out of memory: cannot allocate'):
            raise MemoryError

        if i >= MAX_OUTPUT_LINES:
            raise MemoryError

        yield line


def create_run(request: HttpRequest):
    if request.method == "POST":
        body = json.loads(request.body.decode())

        return StreamingHttpResponse(stream(body["contents"]))


def get_lessons(_request: HttpRequest):
    return JsonResponse(load_lessons(), safe=False)
