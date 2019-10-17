
import pymongo
from pymongo import MongoClient

import sys

i=0

client = MongoClient()
db = client.portabilidad


for line in open("cdrs.txt"):
    #print line    
    campos = line.split(",")
    i+=1
    db.portados.insert_one({"OriginationID":campos[0], "m_sIPAdress":campos[1], "m_sRemoteIPAdress":campos[2], "m_sConnectionId":campos[3], "m_sCallingStationId":campos[4], "m_sCalledStationID":campos[5], "stop":capos[6], "start":campos[7], "IDuration":campos[8], "m_dwDisconnectReason":campos[9], "TerminationID": campos[10], "VendorID":campos[11], "PDD": campos[12], "Match": campos[13], "call_hold_time": campos[14], "call_dest_crname": campos[15], "call_dest_crname":campos[16], "isdn_cause_code": campos[17], "original_isdn_cause_code": campos[18], "code_on_src_leg": campos[19], "code_on_dest_leg": campos[20], "CallID": campos[21], "NextoneCallId": campos[22], "m_sCallingStationAux":campos[23], "MatchB":campos[24], "m_sCallingstationSend": campos[25]})
print i
