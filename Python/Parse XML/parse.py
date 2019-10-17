import xml.etree.cElementTree as ET
import sys

def xstr(s):
    if s is None:
        return ''
    return str(s)
archivo_input = sys.argv[1]
tree = ET.parse(archivo_input)
root = tree.getroot()
numList=[]
file = open(archivo_input+".txt", "w")
i=0
for cosa in tree.getiterator("Number"):
 if type(cosa.text) is str:
  numList.append(cosa.text)
  i+=1
i=0
for cosa in tree.getiterator("PortData"):
 file.write(xstr(cosa.findtext("ActionDate"))+";"+xstr(cosa.findtext("Action"))+
";"+xstr(cosa.findtext("isMPP"))+";"+xstr(numList[i])+";"+xstr(cosa.findtext("RC
R"))+";"+xstr(cosa.findtext("PortID"))+";"+xstr(cosa.findtext("DCR"))+";"+xstr(c
osa.findtext("DIDA"))+";"+xstr(cosa.findtext("RIDA"))+";"+xstr(cosa.findtext("Po
rtType"))+";\n")
 i+=1
file.close()
