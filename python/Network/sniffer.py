#!/usr/bin/python

import sys
import getopt
import pcapy
from impacket.ImpactDecoder import EthDecoder

dev  = "wlp3s0"
filter = "ip"
decoder = EthDecoder()
file = open('Sniffer.pcap', 'w')


def handle_packet(hdr, data):
    print decoder.decode(data)
    file.write(data)

def usage():
    print sys.argv[0]+" -i <dev> -f <pcap_filter>"
    file.close()
    sys.exit(1)

try:
    cmd_opts = "f:i"
    opts, arg = getopt.getopt(sys.argv[1:], cmd_opts)
except getopt.GetoptError:
    usage()

for opt in opts:
    if opt[0] == "-f":
        filter=opt[1]
    elif opt[0] == "-i":
        dev = opt[1]
    else:
        usage()

pcap = pcapy.open_live(dev, 1500, 0, 1000)

pcap.setfilter(filter)

pcap.loop(0, handle_packet)
