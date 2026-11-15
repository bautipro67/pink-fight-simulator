"""Turns the translated fake obj_dbulletcontroller (tools/gen_dbullet_types.py: alarm K = attack type
200 + K) into methods typeNNN grafted onto the port's obj_dbulletcontroller:
  python -I tools/graft_types.py <module.js>"""
import re, sys

p = sys.argv[1]
t = open(p, encoding='utf-8').read()
t = re.sub(r'(?m)^  alarm(\d+)\(\) \{', lambda m: '  type%d() {' % (200 + int(m.group(1))), t)
t = t.replace("class Dbulletcontroller extends P('obj_bulletgenparent') {", 'class PinkTypes {')
t = re.sub(r"  constructor\(\) \{\n    super\(\);\n    this\.sprite_index = 'spr_grazemask';\n    this\.visible = false;\n  \}\n", '', t)
t = t.replace("defineObject('obj_dbulletcontroller', Dbulletcontroller);",
              "// Chapter 5's attack types for Pink, on the port's controller (its step calls this['type' + type]).\n"
              "const DB = objectClass('obj_dbulletcontroller');\n"
              "for (const k of Object.getOwnPropertyNames(PinkTypes.prototype)) if (k.startsWith('type')) DB.prototype[k] = PinkTypes.prototype[k];")
open(p, 'w', encoding='utf-8', newline='').write(t)
