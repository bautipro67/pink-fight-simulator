"""Writes research/names.json: Chapter 5's sprite, object and sound names by index (for tools/postfix.py,
which names the indices the decompiler left bare): python -I tools/dump_names.py"""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from datawin import DataWin  # noqa: E402

dw = DataWin('D:/Steam/steamapps/common/DELTARUNE/chapter5_windows/data.win')
names = {k: [dw.str(dw.u32(q)) for q in dw.chunk_list(chunk)] for k, chunk in (('sprites', 'SPRT'), ('objects', 'OBJT'), ('sounds', 'SOND'))}
json.dump(names, open(os.path.join(os.path.dirname(HERE), 'research', 'names.json'), 'w'), separators=(',', ':'))
print({k: len(v) for k, v in names.items()})
