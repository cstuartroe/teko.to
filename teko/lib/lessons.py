from yaml import load, Loader


def transform_lesson(obj):
    if isinstance(obj, str):
        return {
            "title": obj,
            "children": [],
        }

    elif isinstance(obj, dict):
        title = list(obj)[0]
        return {
            "title": title,
            "children": [
                transform_lesson(lesson)
                for lesson in obj[title]
            ],
        }

    else:
        raise ValueError(f"Invalid lesson: {obj}")


def load_lessons():
    with open("teko/lib/lessons.yml", "r") as fh:
        lessons = load(fh, Loader)

    return [
        transform_lesson(lesson)
        for lesson in lessons
    ]
