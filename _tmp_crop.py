from PIL import Image
im = Image.open('/private/tmp/claude-501/-Users-juhyunchoi-Coding-python-quiz-dashboard/dc514291-2537-45a2-b226-36ab6955c2c1/scratchpad/shots/p9-step6.png')
crop = im.crop((595, 700, 930, 745))
crop = crop.resize((crop.width*4, crop.height*4), Image.LANCZOS)
crop.save('/private/tmp/claude-501/-Users-juhyunchoi-Coding-python-quiz-dashboard/dc514291-2537-45a2-b226-36ab6955c2c1/scratchpad/shots/crop_row5.png')
