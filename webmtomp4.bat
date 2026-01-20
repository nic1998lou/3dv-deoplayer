"%~dp0\ffmpeg.exe" -i %1 -vf "crop=trunc(iw/2)*2:trunc(ih/2)*2" -vcodec libx264 -pix_fmt yuv420p %~dpn1.mp4
