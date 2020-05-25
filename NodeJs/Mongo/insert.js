const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

let body =

  {
    data: '{"headers":[{"name":"Event-Name","value":"CHANNEL_HANGUP_COMPLETE"},{"name":"Core-UUID","value":"f1e6458e-852d-11ea-b649-9b4c5f61deac"},{"name":"FreeSWITCH-Hostname","value":"sto3"},{"name":"FreeSWITCH-Switchname","value":"sto3"},{"name":"FreeSWITCH-IPv4","value":"10.9.2.53"},{"name":"FreeSWITCH-IPv6","value":"::1"},{"name":"Event-Date-Local","value":"2020-04-23 12:09:39"},{"name":"Event-Date-GMT","value":"Thu, 23 Apr 2020 17:09:39 GMT"},{"name":"Event-Date-Timestamp","value":"1587661779835549"},{"name":"Event-Calling-File","value":"switch_core_state_machine.c"},{"name":"Event-Calling-Function","value":"switch_core_session_reporting_state"},{"name":"Event-Calling-Line-Number","value":"946"},{"name":"Event-Sequence","value":"7740015"},{"name":"Hangup-Cause","value":"NORMAL_CLEARING"},{"name":"Channel-State","value":"CS_REPORTING"},{"name":"Channel-Call-State","value":"HANGUP"},{"name":"Channel-State-Number","value":"11"},{"name":"Channel-Name","value":"sofia/exteno1/3325040401@10.9.2.41"},{"name":"Unique-ID","value":"2fe905cc-8585-11ea-955b-9b4c5f61deac"},{"name":"Call-Direction","value":"inbound"},{"name":"Presence-Call-Direction","value":"inbound"},{"name":"Channel-HIT-Dialplan","value":"true"},{"name":"Channel-Call-UUID","value":"2fe905cc-8585-11ea-955b-9b4c5f61deac"},{"name":"Answer-State","value":"hangup"},{"name":"Channel-Read-Codec-Name","value":"PCMU"},{"name":"Channel-Read-Codec-Rate","value":"8000"},{"name":"Channel-Read-Codec-Bit-Rate","value":"64000"},{"name":"Channel-Write-Codec-Name","value":"PCMU"},{"name":"Channel-Write-Codec-Rate","value":"8000"},{"name":"Channel-Write-Codec-Bit-Rate","value":"64000"},{"name":"Caller-Direction","value":"inbound"},{"name":"Caller-Logical-Direction","value":"inbound"},{"name":"Caller-Username","value":"3325040401"},{"name":"Caller-Dialplan","value":"XML"},{"name":"Caller-Caller-ID-Name","value":"V4231209380044818503"},{"name":"Caller-Caller-ID-Number","value":"3325040401"},{"name":"Caller-Orig-Caller-ID-Name","value":"V4231209380044818503"},{"name":"Caller-Orig-Caller-ID-Number","value":"3325040401"},{"name":"Caller-Callee-ID-Name","value":"Outbound Call"},{"name":"Caller-Callee-ID-Number","value":"5534330257"},{"name":"Caller-Network-Addr","value":"10.9.2.41"},{"name":"Caller-ANI","value":"3325040401"},{"name":"Caller-Destination-Number","value":"5534330257"},{"name":"Caller-Unique-ID","value":"2fe905cc-8585-11ea-955b-9b4c5f61deac"},{"name":"Caller-Source","value":"mod_sofia"},{"name":"Caller-Context","value":"public"},{"name":"Caller-Channel-Name","value":"sofia/exteno1/3325040401@10.9.2.41"},{"name":"Caller-Profile-Index","value":"1"},{"name":"Caller-Profile-Created-Time","value":"1587661766915494"},{"name":"Caller-Channel-Created-Time","value":"1587661766915494"},{"name":"Caller-Channel-Answered-Time","value":"1587661777635498"},{"name":"Caller-Channel-Progress-Time","value":"0"},{"name":"Caller-Channel-Progress-Media-Time","value":"1587661769535496"},{"name":"Caller-Channel-Hangup-Time","value":"1587661779835549"},{"name":"Caller-Channel-Transfer-Time","value":"0"},{"name":"Caller-Channel-Resurrect-Time","value":"0"},{"name":"Caller-Channel-Bridged-Time","value":"1587661769535496"},{"name":"Caller-Channel-Last-Hold","value":"0"},{"name":"Caller-Channel-Hold-Accum","value":"0"},{"name":"Caller-Screen-Bit","value":"false"},{"name":"Caller-Privacy-Hide-Name","value":"false"},{"name":"Caller-Privacy-Hide-Number","value":"false"},{"name":"variable_direction","value":"inbound"},{"name":"variable_uuid","value":"2fe905cc-8585-11ea-955b-9b4c5f61deac"},{"name":"variable_session_id","value":"223943"},{"name":"variable_sip_from_user","value":"3325040401"},{"name":"variable_sip_from_uri","value":"3325040401@10.9.2.41"},{"name":"variable_sip_from_host","value":"10.9.2.41"},{"name":"variable_video_media_flow","value":"disabled"},{"name":"variable_text_media_flow","value":"disabled"},{"name":"variable_channel_name","value":"sofia/exteno1/3325040401@10.9.2.41"},{"name":"variable_sip_local_network_addr","value":"10.9.2.53"},{"name":"variable_sip_network_ip","value":"10.9.2.41"},{"name":"variable_sip_network_port","value":"5060"},{"name":"variable_sip_invite_stamp","value":"1587661766915494"},{"name":"variable_sip_received_ip","value":"10.9.2.41"},{"name":"variable_sip_received_port","value":"5060"},{"name":"variable_sip_via_protocol","value":"udp"},{"name":"variable_sip_from_user_stripped","value":"3325040401"},{"name":"variable_sofia_profile_name","value":"exteno1"},{"name":"variable_sofia_profile_url","value":"sip:mod_sofia@10.9.2.53:5060"},{"name":"variable_recovery_profile_name","value":"exteno1"},{"name":"variable_sip_Remote-Party-ID","value":"\\"V4231209380044818503\\" <sip:3325040401@10.9.2.41>;party=calling;privacy=off;screen=no"},{"name":"variable_sip_cid_type","value":"rpid"},{"name":"variable_sip_allow","value":"INVITE, ACK, CANCEL, OPTIONS, BYE, REFER, SUBSCRIBE, NOTIFY, INFO, PUBLISH, MESSAGE"},{"name":"variable_sip_req_user","value":"5534330257"},{"name":"variable_sip_req_uri","value":"5534330257@10.9.2.53"},{"name":"variable_sip_req_host","value":"10.9.2.53"},{"name":"variable_sip_to_user","value":"5534330257"},{"name":"variable_sip_to_uri","value":"5534330257@10.9.2.53"},{"name":"variable_sip_to_host","value":"10.9.2.53"},{"name":"variable_sip_contact_user","value":"3325040401"},{"name":"variable_sip_contact_port","value":"5060"},{"name":"variable_sip_contact_uri","value":"3325040401@10.9.2.41:5060"},{"name":"variable_sip_contact_host","value":"10.9.2.41"},{"name":"variable_sip_via_host","value":"10.9.2.41"},{"name":"variable_sip_via_port","value":"5060"},{"name":"variable_max_forwards","value":"70"},{"name":"variable_switch_r_sdp","value":"v=0\\r\\no=root 2143905013 2143905013 IN IP4 10.9.2.41\\r\\ns=Asterisk PBX 11.25.1-vici\\r\\nc=IN IP4 10.9.2.41\\r\\nt=0 0\\r\\nm=audio 15156 RTP/AVP 0 8 18 101\\r\\na=rtpmap:0 PCMU/8000\\r\\na=rtpmap:8 PCMA/8000\\r\\na=rtpmap:18 G729/8000\\r\\na=fmtp:18 annexb=no\\r\\na=rtpmap:101 telephone-event/8000\\r\\na=fmtp:101 0-16\\r\\na=ptime:20\\r\\n"},{"name":"variable_ep_codec_string","value":"CORE_PCM_MODULE.PCMU@8000h@20i@64000b,CORE_PCM_MODULE.PCMA@8000h@20i@64000b,mod_bcg729.G729@8000h@20i@8000b"},{"name":"variable_DP_MATCH","value":["5534330257","5534330257"]},{"name":"variable_call_uuid","value":"2fe905cc-8585-11ea-955b-9b4c5f61deac"},{"name":"variable_project","value":"cpd"},{"name":"variable_sipIn","value":"MULTI_41"},{"name":"variable_bypass_media","value":"false"},{"name":"variable_absolute_codec_string","value":"G729,PCMU,PCMA"},{"name":"variable_sipOut","value":"tk_mcm1"},{"name":"variable_gateway","value":"gateway/1-tk_mcm1"},{"name":"variable_current_application_data","value":"http://127.0.0.1:8186/?phone=5534330257&bl=cpd"},{"name":"variable_current_application","value":"curl"},{"name":"variable_curl_response_data","value":"100"},{"name":"variable_curl_response_code","value":"200"},{"name":"variable_rtp_use_codec_string","value":"G729,PCMU,PCMA"},{"name":"variable_remote_audio_media_flow","value":"sendrecv"},{"name":"variable_audio_media_flow","value":"sendrecv"},{"name":"variable_rtp_audio_recv_pt","value":"0"},{"name":"variable_rtp_use_codec_name","value":"PCMU"},{"name":"variable_rtp_use_codec_rate","value":"8000"},{"name":"variable_rtp_use_codec_ptime","value":"20"},{"name":"variable_rtp_use_codec_channels","value":"1"},{"name":"variable_rtp_last_audio_codec_string","value":"PCMU@8000h@20i@1c"},{"name":"variable_read_codec","value":"PCMU"},{"name":"variable_original_read_codec","value":"PCMU"},{"name":"variable_read_rate","value":"8000"},{"name":"variable_original_read_rate","value":"8000"},{"name":"variable_write_codec","value":"PCMU"},{"name":"variable_write_rate","value":"8000"},{"name":"variable_dtmf_type","value":"rfc2833"},{"name":"variable_local_media_ip","value":"10.9.2.53"},{"name":"variable_local_media_port","value":"19078"},{"name":"variable_advertised_media_ip","value":"10.9.2.53"},{"name":"variable_rtp_use_timer_name","value":"soft"},{"name":"variable_rtp_use_pt","value":"0"},{"name":"variable_rtp_use_ssrc","value":"3010616862"},{"name":"variable_rtp_2833_send_payload","value":"101"},{"name":"variable_rtp_2833_recv_payload","value":"101"},{"name":"variable_remote_media_ip","value":"10.9.2.41"},{"name":"variable_remote_media_port","value":"15156"},{"name":"variable_last_bridge_to","value":"2feb2fb4-8585-11ea-956c-9b4c5f61deac"},{"name":"variable_bridge_channel","value":"sofia/exteno2/5534330257"},{"name":"variable_bridge_uuid","value":"2feb2fb4-8585-11ea-956c-9b4c5f61deac"},{"name":"variable_signal_bond","value":"2feb2fb4-8585-11ea-956c-9b4c5f61deac"},{"name":"variable_rtp_local_sdp_str","value":"v=0\\r\\no=FreeSWITCH 1587642691 1587642693 IN IP4 10.9.2.53\\r\\ns=FreeSWITCH\\r\\nc=IN IP4 10.9.2.53\\r\\nt=0 0\\r\\nm=audio 19078 RTP/AVP 0 101\\r\\na=rtpmap:0 PCMU/8000\\r\\na=rtpmap:101 telephone-event/8000\\r\\na=fmtp:101 0-16\\r\\na=ptime:20\\r\\na=sendrecv\\r\\n"},{"name":"variable_endpoint_disposition","value":"ANSWER"},{"name":"variable_sip_to_tag","value":"vUvvav1ZUBjjp"},{"name":"variable_sip_from_tag","value":"as37baf439"},{"name":"variable_sip_cseq","value":"102"},{"name":"variable_sip_call_id","value":"53a4535a45487d572bd136481e8b49d4@10.9.2.41:5060"},{"name":"variable_sip_full_via","value":"SIP/2.0/UDP 10.9.2.41:5060;branch=z9hG4bK0b054ea2"},{"name":"variable_sip_from_display","value":"V4231209380044818503"},{"name":"variable_sip_full_from","value":"\\"V4231209380044818503\\" <sip:3325040401@10.9.2.41>;tag=as37baf439"},{"name":"variable_sip_full_to","value":"<sip:5534330257@10.9.2.53>;tag=vUvvav1ZUBjjp"},{"name":"variable_last_sent_callee_id_name","value":"Outbound Call"},{"name":"variable_last_sent_callee_id_number","value":"5534330257"},{"name":"variable_sip_term_status","value":"200"},{"name":"variable_proto_specific_hangup_cause","value":"sip:200"},{"name":"variable_sip_term_cause","value":"16"},{"name":"variable_sip_bye_h_X-Asterisk-HangupCause","value":"Unknown"},{"name":"variable_sip_bye_h_X-Asterisk-HangupCauseCode","value":"0"},{"name":"variable_last_bridge_role","value":"originator"},{"name":"variable_sip_user_agent","value":"Asterisk PBX 11.25.1-vici"},{"name":"variable_sip_hangup_disposition","value":"recv_bye"},{"name":"variable_bridge_hangup_cause","value":"NORMAL_CLEARING"},{"name":"variable_hangup_cause","value":"NORMAL_CLEARING"},{"name":"variable_hangup_cause_q850","value":"16"},{"name":"variable_digits_dialed","value":"none"},{"name":"variable_start_stamp","value":"2020-04-23 12:09:26"},{"name":"variable_profile_start_stamp","value":"2020-04-23 12:09:26"},{"name":"variable_answer_stamp","value":"2020-04-23 12:09:37"},{"name":"variable_bridge_stamp","value":"2020-04-23 12:09:29"},{"name":"variable_progress_media_stamp","value":"2020-04-23 12:09:29"},{"name":"variable_end_stamp","value":"2020-04-23 12:09:39"},{"name":"variable_start_epoch","value":"1587661766"},{"name":"variable_start_uepoch","value":"1587661766915494"},{"name":"variable_profile_start_epoch","value":"1587661766"},{"name":"variable_profile_start_uepoch","value":"1587661766915494"},{"name":"variable_answer_epoch","value":"1587661777"},{"name":"variable_answer_uepoch","value":"1587661777635498"},{"name":"variable_bridge_epoch","value":"1587661769"},{"name":"variable_bridge_uepoch","value":"1587661769535496"},{"name":"variable_last_hold_epoch","value":"0"},{"name":"variable_last_hold_uepoch","value":"0"},{"name":"variable_hold_accum_seconds","value":"0"},{"name":"variable_hold_accum_usec","value":"0"},{"name":"variable_hold_accum_ms","value":"0"},{"name":"variable_resurrect_epoch","value":"0"},{"name":"variable_resurrect_uepoch","value":"0"},{"name":"variable_progress_epoch","value":"0"},{"name":"variable_progress_uepoch","value":"0"},{"name":"variable_progress_media_epoch","value":"1587661769"},{"name":"variable_progress_media_uepoch","value":"1587661769535496"},{"name":"variable_end_epoch","value":"1587661779"},{"name":"variable_end_uepoch","value":"1587661779835549"},{"name":"variable_last_app","value":"curl"},{"name":"variable_last_arg","value":"http://127.0.0.1:8186/?phone=5534330257&bl=cpd"},{"name":"variable_caller_id","value":"\\"V4231209380044818503\\" <3325040401>"},{"name":"variable_duration","value":"13"},{"name":"variable_billsec","value":"2"},{"name":"variable_progresssec","value":"0"},{"name":"variable_answersec","value":"11"},{"name":"variable_waitsec","value":"3"},{"name":"variable_progress_mediasec","value":"3"},{"name":"variable_flow_billsec","value":"13"},{"name":"variable_mduration","value":"12920"},{"name":"variable_billmsec","value":"2200"},{"name":"variable_progressmsec","value":"0"},{"name":"variable_answermsec","value":"10720"},{"name":"variable_waitmsec","value":"2620"},{"name":"variable_progress_mediamsec","value":"2620"},{"name":"variable_flow_billmsec","value":"12920"},{"name":"variable_uduration","value":"12920055"},{"name":"variable_billusec","value":"2200051"},{"name":"variable_progressusec","value":"0"},{"name":"variable_answerusec","value":"10720004"},{"name":"variable_waitusec","value":"2620002"},{"name":"variable_progress_mediausec","value":"2620002"},{"name":"variable_flow_billusec","value":"12920055"},{"name":"variable_rtp_audio_in_raw_bytes","value":"172"},{"name":"variable_rtp_audio_in_media_bytes","value":"172"},{"name":"variable_rtp_audio_in_packet_count","value":"1"},{"name":"variable_rtp_audio_in_media_packet_count","value":"1"},{"name":"variable_rtp_audio_in_skip_packet_count","value":"515"},{"name":"variable_rtp_audio_in_jitter_packet_count","value":"0"},{"name":"variable_rtp_audio_in_dtmf_packet_count","value":"0"},{"name":"variable_rtp_audio_in_cng_packet_count","value":"0"},{"name":"variable_rtp_audio_in_flush_packet_count","value":"0"},{"name":"variable_rtp_audio_in_largest_jb_size","value":"0"},{"name":"variable_rtp_audio_in_jitter_min_variance","value":"0.00"},{"name":"variable_rtp_audio_in_jitter_max_variance","value":"0.00"},{"name":"variable_rtp_audio_in_jitter_loss_rate","value":"0.00"},{"name":"variable_rtp_audio_in_jitter_burst_rate","value":"0.00"},{"name":"variable_rtp_audio_in_mean_interval","value":"0.00"},{"name":"variable_rtp_audio_in_flaw_total","value":"0"},{"name":"variable_rtp_audio_in_quality_percentage","value":"100.00"},{"name":"variable_rtp_audio_in_mos","value":"4.50"},{"name":"variable_rtp_audio_out_raw_bytes","value":"87720"},{"name":"variable_rtp_audio_out_media_bytes","value":"87720"},{"name":"variable_rtp_audio_out_packet_count","value":"510"},{"name":"variable_rtp_audio_out_media_packet_count","value":"510"},{"name":"variable_rtp_audio_out_skip_packet_count","value":"0"},{"name":"variable_rtp_audio_out_dtmf_packet_count","value":"0"},{"name":"variable_rtp_audio_out_cng_packet_count","value":"0"},{"name":"variable_rtp_audio_rtcp_packet_count","value":"0"},{"name":"variable_rtp_audio_rtcp_octet_count","value":"0"}],"hPtr":null,"type":"CHANNEL_HANGUP_COMPLETE","body":""}'
  }
let data = body.data
let json = JSON.parse(data);


 MongoClient.connect(url, function (err, client) {
   assert.equal(null, err);
   console.log("Connected successfully to server");
   const db = client.db("VOIP");
   db.collection('cdrs').insert(json, function (err, result) {
     if (err)
       res.send('Error');
     else
       res.send('Success');

       client.close();
   });
   
   return resolve(db)
 });

console.log(json);