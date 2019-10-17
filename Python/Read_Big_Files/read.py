import sys
import os
import datetime
import time

for dirname, dirnames, filenames in os.walk('.'):
    for filename in filenames:
        filename = os.path.join(dirname, filename).replace("./","");
        print filename
        if ".py" in filename or ".csv" in filename or ".zip" in filename or ".rar" in filename :
            print "Es el archivo master no hacer nada"
        else:
            #Lextura de Archivos
            file_in = open(filename, "r")
            file_out = open(filename+"_0.csv", "w")

            #Escritura de cabeceras del archivo de salida
            file_out.write("Date , User-Name, NAS-IP-Address, NAS-Port, Calling-Station, Called-Station-Id,Acct-Session-Id,Acct-Status-Type, Acct-Terminate-Cause, NAS-Port-Type, Service-Type, Dialogic-call-origin , Dialogic-call-type , Dialogic-Q931-disconnect-cause, Acct-Delay-Time, Login-IP-Host, Tunnel-Client-Endpoint, Dialogic-setup-time, Dialogic-voip-dst-sig-ip-in, Dialogic-voip-dst-rtp-ip-in,Dialogic-dnis-pre-translate,Dialogic-ani-pre-translate,Dialogic-call-direction,Dialogic-trunk-grp-in,Dialogic-voip-src-sign-ip-in,Dialogic-voip-src-rtp-ip-in,Dialogic-call-id,Dialogic-prev-hop-ip,Dialogic-prev-hop-via,Dialogic-incoming-req-uri,Dialogic-voip-local-vocoders,Dialogic-voip-remote-vocoders,Dialogic-voip-codec-priority,Dialogic-span-id,Dialogic-channel-id,Acct-Unique-Session-Id,Dialogic-release-source,Timestamp\n")

            #Definicion de variables
            fecha = ""
            userName = ""
            nasIpAddress = ""
            nasPort = ""
            callingStationId = ""
            calledStationId = ""
            acctStatusSessionId = ""
            acctStatusType = ""
            acctTerminate = ""
            nasPortType = ""
            serviceType = ""
            dialCallOrigin = ""
            dialCallType = ""
            Q931 = ""
            delayTime = ""
            acctDelayType = ""
            loginIpHost = ""
            tunnelClientEndPoint =""
            setupTime = ""
            voipDstSignIp = ""
            voipDstRtpIp = ""
            dnisTraslate = ""
            aniTraslate = ""
            callDirection = ""
            trunkGprIn = ""
            voipSrcSignIp = ""
            voipSrcRtpIp = ""
            callId = ""
            prevHopIp = ""
            prevHopVia = ""
            incommingReqUri = ""
            voipLocalVocoders = ""
            voipRemoteVocoders = ""
            voipCodecPriority = ""
            spanId = ""
            channelId = ""
            sessionId = ""
            timeStamp = ""
            DialogicReleaseSource = ""

            contadorLineas = 0


            bloque = "inicia"
            cadena = ""
            contadorLinea = 1
            for line in file_in:
              #print line
              if "Timestamp" in line:

                timeStamp = datetime.datetime.fromtimestamp(int(line.replace("Timestamp = ","").replace("\n", ""))).strftime('%Y-%m-%d %H:%M:%S')
                bloque = "finaliza"

              if bloque == "inicia":
                if "User-Name " in line:
                    userName =  line.replace("User-Name = ","").replace("\n", "").replace("\"","")
                elif "NAS-IP-Address " in line:
                    nasIpAddress =  line.replace("NAS-IP-Address = ","").replace("\n", "").replace("\"","")
                elif "NAS-Port " in line:
                    nasPort =  line.replace("NAS-Port = ","").replace("\n", "").replace("\"","")
                elif "Calling-Station-Id " in line:
                    callingStationId = line.replace("Calling-Station-Id = ","").replace("\n", "").replace("\"","")
                elif "Called-Station-Id " in line:
                    calledStationId = line.replace("Called-Station-Id = ","").replace("\n", "").replace("\"","")
                elif "Acct-Session-Id " in line:
                    acctStatusSessionId = line.replace("Acct-Session-Id = ","").replace("\n", "").replace("\"","")
                elif "Acct-Status-Type " in line:
                    acctStatusType = line.replace("Acct-Status-Type = ","").replace("\n", "").replace("\"","")
                elif "NAS-Port-Type " in line:
                    nasPortType = line.replace("NAS-Port-Type = ","").replace("\n", "").replace("\"","")
                elif "Service-Type " in line:
                    serviceType = line.replace("Service-Type = ","").replace("\n", "").replace("\"","")
                elif "Dialogic-call-origin " in line:
                    dialCallOrigin = line.replace("Dialogic-call-origin = ","").replace("\n", "").replace("\"","")
                elif "Dialogic-call-type " in line:
                    dialCallType = line.replace("Dialogic-call-type = ","").replace("\n", "").replace("\"","")
                elif "Acct-Delay-Time " in line:
                    acctDelayType = line.replace("Acct-Delay-Time = ","").replace("\n", "").replace("\"","")
                elif "Login-IP-Host " in line:
                    loginIpHost = line.replace("Login-IP-Host = ","").replace("\n", "").replace("\"","")
                elif "Tunnel-Client-Endpoint:0 " in line:
                    tunnelClientEndPoint = line.replace("Tunnel-Client-Endpoint:0 = ","").replace("\n", "").replace("\"","")
                elif "Dialogic-setup-time " in line:
                    setupTime = line.replace("Dialogic-setup-time = ","").replace("\n", "").replace("\"","")
                elif "Dialogic-voip-dst-sig-ip-in " in line:
                    voipDstSignIp = line.replace("Dialogic-voip-dst-sig-ip-in = ","").replace("\n", "").replace("\"","")
                elif "Dialogic-voip-dst-rtp-ip-in " in line:
                    voipDstRtpIp = line.replace("Dialogic-voip-dst-rtp-ip-in = ","").replace("\n", "").replace("\"","")
                elif "Dialogic-dnis-pre-translate " in line:
                    dnisTraslate = line.replace("Dialogic-dnis-pre-translate = ","").replace("\n", "").replace("\"","")
                elif "Dialogic-ani-pre-translate " in line:
                    aniTraslate = line.replace("Dialogic-ani-pre-translate = ","").replace("\n", "").replace("\"","")
                elif "Dialogic-call-direction " in line:
                    callDirection = line.replace("Dialogic-call-direction = ","").replace("\n", "").replace("\"","")
                elif "Dialogic-trunk-grp-in " in line:
                    trunkGprIn = line.replace("Dialogic-trunk-grp-in = ","").replace("\n", "").replace("\"","")
                elif "Dialogic-voip-src-rtp-ip-in " in line:
                    voipSrcRtpIp = line.replace("Dialogic-voip-src-rtp-ip-in = ","").replace("\n", "").replace("\"","")
                elif "Dialogic-voip-src-sig-ip-in " in line:
                    voipSrcSignIp = line.replace("Dialogic-voip-src-sig-ip-in = ","").replace("\n", "").replace("\"","")
                elif "Dialogic-call-id " in line:
                    callId = line.replace("Dialogic-call-id = ","").replace("\n", "").replace("\"","")
                elif "Dialogic-prev-hop-ip " in line:
                    prevHopIp = line.replace("Dialogic-prev-hop-ip = ","").replace("\n", "").replace("\"","")
                elif "Dialogic-prev-hop-via " in line:
                    prevHopVia = line.replace("Dialogic-prev-hop-via = ","").replace("\n", "").replace("\"","")
                elif "Dialogic-incoming-req-uri " in line:
                    incommingReqUri = line.replace("Dialogic-incoming-req-uri = ","").replace("\n", "").replace("\"","")
                elif "Dialogic-voip-local-vocoders " in line:
                    voipLocalVocoders = line.replace("Dialogic-voip-local-vocoders = ","").replace("\n", "").replace(","," - ").replace("\"","")
                elif "Dialogic-voip-remote-vocoders " in line:
                    voipRemoteVocoders = line.replace("Dialogic-voip-remote-vocoders = ","").replace("\n", "").replace(","," - ").replace("\"", "")
                elif "Dialogic-voip-codec-priority " in line:
                    voipCodecPriority = line.replace("Dialogic-voip-codec-priority = ","").replace("\n", "").replace("\"","")
                elif "Dialogic-span-id " in line:
                    spanId = line.replace("Dialogic-span-id = ","").replace("\n", "").replace("\"","")
                elif "Dialogic-channel-id " in line:
                    channelId = line.replace("Dialogic-channel-id = ","").replace("\n", "").replace("\"","")
                elif "Acct-Unique-Session-Id " in line:
                    sessionId = line.replace("Acct-Unique-Session-Id = ","").replace("\n", "").replace("\"","")
                elif "Timestamp " in line:
                    timeStamp = datetime.datetime.fromtimestamp(int(line.replace("Timestamp = ","").replace("\n", ""))).strftime('%Y-%m-%d %H:%M:%S')
                elif ("Mon " in line) or ("Tue " in line) or ("Wed " in line) or ("Thu " in line) or ("Fri " in line) or ("Sun " in line) or ("Sat " in line)  :
                    fecha = line.replace("\n", "")
                elif "Dialogic-Q931-disconnect-cause " in line:
                    Q931 = line.replace("Dialogic-Q931-disconnect-cause = ","").replace("\n", "").replace("\"","")
                elif "Acct-Delay-Time " in line:
                    delayTime = line.replace("Acct-Delay-Time = ","").replace("\n", "").replace("\"","")
                elif "Dialogic-release-source " in line:
                    DialogicReleaseSource = line.replace("Dialogic-release-source = ","").replace("\n", "").replace("\"","")
                elif "Acct-Terminate-Cause " in line:
                    acctTerminate = line.replace("Acct-Terminate-Cause = ","").replace("\n", "").replace("\"","")
                #else:
            	    #print "nada"
              else:
                #print "-"+acctStatusType+"-"
                if "Stop" in acctStatusType:
                    #print acctStatusType
                    bloque = "inicia"
                    if contadorLinea == 500000 :
                        file_out.close()
                        file_out = open(filename+"_1.csv", "w")
                    elif contadorLinea == 1000000 :
                        file_out.close()
                        file_out = open(filename+"_2.csv", "w")
                    elif contadorLinea == 1500000 :
                        file_out.close()
                        file_out = open(filename+"_3.csv", "w")
                    elif contadorLinea == 2000000 :
                        file_out.close()
                        file_out = open(filename+"_4.csv", "w")
                    elif contadorLinea == 2500000 :
                        file_out.close()
                        file_out = open(filename+"_5.csv", "w")
                    elif contadorLinea == 3000000 :
                        file_out.close()
                        file_out = open(filename+"_6.csv", "w")
                    elif contadorLinea == 3500000 :
                        file_out.close()
                        file_out = open(filename+"_7.csv", "w")
                    elif contadorLinea == 4000000 :
                        file_out.close()
                        file_out = open(filename+"_8.csv", "w")
                    elif contadorLinea == 4500000 :
                        file_out.close()
                        file_out = open(filename+"_9.csv", "w")
                    elif contadorLinea == 5000000 :
                        file_out.close()
                        file_out = open(filename+"_10.csv", "w")
                    elif contadorLinea == 5500000 :
                        file_out.close()
                        file_out = open(filename+"_11.csv", "w")
                    elif contadorLinea == 6000000 :
                        file_out.close()
                        file_out = open(filename+"_12.csv", "w")

                    file_out.write(fecha +","+
                    userName +","+
                    nasIpAddress+","+
                    nasPort+","+
                    callingStationId+","+
                    calledStationId+","+
                    acctStatusSessionId+","+
                    acctStatusType+","+
                    acctTerminate+","+
                    nasPortType+ ","+
                    serviceType+","+
                    dialCallOrigin+","+
                    dialCallType+","+
                    Q931+","+
                    acctDelayType+","+
                    loginIpHost+","+
                    tunnelClientEndPoint+","+
                    setupTime+","+
                    voipDstSignIp+","+
                    voipDstRtpIp+","+
                    dnisTraslate+","+
                    aniTraslate+","+
                    callDirection+","+
                    trunkGprIn+","+
                    voipSrcSignIp+","+
                    voipSrcRtpIp+","+
                    callId+","+
                    prevHopIp+","+
                    prevHopVia+","+
                    incommingReqUri+","+
                    voipLocalVocoders+","+
                    voipRemoteVocoders+","+
                    voipCodecPriority+","+
                    spanId+","+
                    channelId+","+
                    sessionId+","+
                    DialogicReleaseSource+","+
                    timeStamp+"\n" )

                    fecha = ""
                    userName = ""
                    nasIpAddress = ""
                    nasPort = ""
                    callingStationId = ""
                    calledStationId = ""
                    acctStatusSessionId = ""
                    acctStatusType = ""
                    acctTerminate = ""
                    nasPortType = ""
                    serviceType = ""
                    dialCallOrigin = ""
                    dialCallType = ""
                    Q931 = ""
                    delayTime = ""
                    acctDelayType = ""
                    loginIpHost = ""
                    tunnelClientEndPoint =""
                    setupTime = ""
                    voipDstSignIp = ""
                    voipDstRtpIp = ""
                    dnisTraslate = ""
                    aniTraslate = ""
                    callDirection = ""
                    trunkGprIn = ""
                    voipSrcSignIp = ""
                    voipSrcRtpIp = ""
                    callId = ""
                    prevHopIp = ""
                    prevHopVia = ""
                    incommingReqUri = ""
                    voipLocalVocoders = ""
                    voipRemoteVocoders = ""
                    voipCodecPriority = ""
                    spanId = ""
                    channelId = ""
                    sessionId = ""
                    DialogicReleaseSource = ""
                    timeStamp = ""
                    contadorLinea = contadorLinea +1
                else:
                    bloque = "inicia"

                    fecha = ""
                    userName = ""
                    nasIpAddress = ""
                    nasPort = ""
                    callingStationId = ""
                    calledStationId = ""
                    acctStatusSessionId = ""
                    acctStatusType = ""
                    acctTerminate = ""
                    nasPortType = ""
                    serviceType = ""
                    dialCallOrigin = ""
                    dialCallType = ""
                    Q931 = ""
                    delayTime = ""
                    acctDelayType = ""
                    loginIpHost = ""
                    tunnelClientEndPoint =""
                    setupTime = ""
                    voipDstSignIp = ""
                    voipDstRtpIp = ""
                    dnisTraslate = ""
                    aniTraslate = ""
                    callDirection = ""
                    trunkGprIn = ""
                    voipSrcSignIp = ""
                    voipSrcRtpIp = ""
                    callId = ""
                    prevHopIp = ""
                    prevHopVia = ""
                    incommingReqUri = ""
                    voipLocalVocoders = ""
                    voipRemoteVocoders = ""
                    voipCodecPriority = ""
                    spanId = ""
                    channelId = ""
                    sessionId = ""
                    DialogicReleaseSource = ""
                    timeStamp = ""

            #     print acctStatusType




            file_in.close()
            file_out.close()
