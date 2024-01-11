async def file_iterator(file_path, chunk_size=65536):
    with open(file_path, "rb") as video_file:
        while True:
            chunk = video_file.read(chunk_size)
            if not chunk:
                break
            yield chunk