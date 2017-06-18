var fs = require('fs'),
    xml2js = require('xml2js');
var cmd = require('node-cmd')
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'web-banamex',
    password: '#b4n4m3x!.',
    database: 'banamex'
});

connection.connect(function(err) {
    if (err) {
        console.error('BD[MYSQL] - error connection: ' + err.stack);
        return;
    } else {
        console.log('BD[MYSQL] - log :  Todo Fino');

        try {
            var i = 1
            cmd.get('ls ./cdrs_banamex/xml_cdr/', function(err, data, stderr) {
                console.log(data)
                var files = data.split('\n')
                try {
                    files.forEach(function(element) {
                        var name_file = element.replace(/\.\/cdrs_banamex\/xml_cdr\//g, '')
                        var limit = 100
                        if (name_file.indexOf('xml') > -1 && i <= limit) {
                            console.log(name_file + ' - ' + i);
                            i++
                            try {
                                parse_xml("./cdrs_banamex/xml_cdr/"+name_file, connection, i, limit)
                                cmd.run('mv ./cdrs_banamex/xml_cdr/' + name_file + ' ./cdrs_banamex/xml_cdr_parseado/')
                            } catch (err) {
                                console.error('IN FOR[CMD] - Error : ' + err);
                            }

                        }
                    });
                } catch (e) {
                    console.error('FOR[CMD] - Error : ' + e);
                }
            });
        } catch (err) {
            console.error('Error:' + err);
        }
    }
});



function parse_xml(dir_path, connection, numberConnection, limit) {

    var parser = new xml2js.Parser();
    fs.readFile(dir_path, function(err, data) {
        parser.parseString(data, function(err, result) {

            try {
                var start_stamp = decodeURIComponent(result.cdr['variables'][0]['start_stamp'][0])
            } catch (e) {
                start_stamp = null
            }
            try {
                var core_uuid = result.cdr['$']['core-uuid'];
            } catch (e) {
                core_uuid = null
            }
            try {
                var flags = result.cdr['channel_data'][0]['flags'][0];
            } catch (e) {
                flags = null
            }
            try {
                var caps = result.cdr['channel_data'][0]['caps'][0];
            } catch (e) {
                caps = null
            }
            try {
                var uuid = result.cdr['variables'][0]['uuid'][0]
            } catch (e) {
                uuid = null
            }
            try {
                var uuid_org = result.cdr['variables'][0]['uuid_org'][0]
            } catch (e) {
                uuid_org = null
            }
            try {
                var session_id = result.cdr['variables'][0]['session_id'][0]
            } catch (e) {
                session_id = null
            }
            try {
                var sip_from_user = result.cdr['variables'][0]['sip_from_user'][0]
            } catch (e) {
                sip_from_user = null
            }
            try {
                var sip_from_uri = decodeURIComponent(result.cdr['variables'][0]['sip_from_uri'][0])
            } catch (e) {
                sip_from_uri = null
            }
            try {
                var ep_codec_string = decodeURIComponent(result.cdr['variables'][0]['ep_codec_string'][0])
            } catch (e) {
                ep_codec_string = null
            }
            try {
                var sip_local_network_addr = result.cdr['variables'][0]['sip_local_network_addr'][0]
            } catch (e) {
                sip_local_network_addr = null
            }
            try {
                var sip_network_ip = result.cdr['variables'][0]['sip_network_ip'][0]
            } catch (e) {
                sip_network_ip = null
            }
            try {
                var sip_via_protocol = result.cdr['variables'][0]['sip_via_protocol'][0]
            } catch (e) {
                sip_via_protocol = null
            }
            try {
                var sip_invite_record_route = result.cdr['variables'][0]['sip_invite_record_route'][0]
            } catch (e) {
                sip_invite_record_route = null
            } // -- Falta definir --
            try {
                var sip_req_user = result.cdr['variables'][0]['sip_req_user'][0]
            } catch (e) {
                sip_req_user = null
            }
            try {
                var sip_req_uri = decodeURIComponent(result.cdr['variables'][0]['sip_req_uri'][0])
            } catch (e) {
                sip_req_uri = null
            }
            try {
                var sip_to_user = decodeURIComponent(result.cdr['variables'][0]['sip_to_user'][0])
            } catch (e) {
                sip_to_user = null
            }
            try {
                var sip_to_uri = decodeURIComponent(result.cdr['variables'][0]['sip_to_uri'][0])
            } catch (e) {
                sip_to_uri = null
            }
            try {
                var presence_id = decodeURIComponent(result.cdr['variables'][0]['presence_id'][0])
            } catch (e) {
                presence_id = null
            }
            try {
                var local_media_ip = decodeURIComponent(result.cdr['variables'][0]['local_media_ip'][0])
            } catch (e) {
                local_media_ip = null
            }
            try {
                var rtp_use_codec_name = decodeURIComponent(result.cdr['variables'][0]['rtp_use_codec_name'][0])
            } catch (e) {
                rtp_use_codec_name = null
            }
            try {
                var rtp_use_codec_rate = decodeURIComponent(result.cdr['variables'][0]['rtp_use_codec_rate'][0])
            } catch (e) {
                rtp_use_codec_rate = null
            }
            try {
                var rtp_use_codec_ptime = decodeURIComponent(result.cdr['variables'][0]['rtp_use_codec_ptime'][0])
            } catch (e) {
                rtp_use_codec_ptime = null
            }
            try {
                var rtp_use_codec_channels = decodeURIComponent(result.cdr['variables'][0]['rtp_use_codec_channels'][0])
            } catch (e) {
                rtp_use_codec_channels = null
            }
            try {
                var lcr_carrier = decodeURIComponent(result.cdr['variables'][0]['lcr_carrier'][0])
            } catch (e) {
                lcr_carrier = null
            }
            try {
                var lcr_rate = decodeURIComponent(result.cdr['variables'][0]['lcr_rate'][0])
            } catch (e) {
                lcr_rate = null
            }
            try {
                var endpoint_disposition = decodeURIComponent(result.cdr['variables'][0]['endpoint_disposition'][0])
            } catch (e) {
                endpoint_disposition = null
            }
            try {
                var last_bridge_hangup_cause = decodeURIComponent(result.cdr['variables'][0]['last_bridge_hangup_cause'][0])
            } catch (e) {
                last_bridge_hangup_cause = null
            }
            try {
                var ivr_menu_status = decodeURIComponent(result.cdr['variables'][0]['ivr_menu_status'][0])
            } catch (e) {
                ivr_menu_status = null
            }
            try {
                var sip_contact_host = decodeURIComponent(result.cdr['variables'][0]['sip_contact_host'][0])
            } catch (e) {
                sip_contact_host = null
            }
            try {
                var sip_term_status = decodeURIComponent(result.cdr['variables'][0]['sip_term_status'][0])
            } catch (e) {
                sip_term_status = null
            }
            try {
                var sip_from_display = decodeURIComponent(result.cdr['variables'][0]['sip_from_display'][0])
            } catch (e) {
                sip_from_display = null
            }
            try {
                var sip_full_from = decodeURIComponent(result.cdr['variables'][0]['sip_full_from'][0])
            } catch (e) {
                sip_full_from = null
            }
            try {
                var sip_user_agent = decodeURIComponent(result.cdr['variables'][0]['sip_user_agent'][0])
            } catch (e) {
                sip_user_agent = null
            }
            try {
                var sip_via_host = decodeURIComponent(result.cdr['variables'][0]['sip_via_host'][0])
            } catch (e) {
                sip_via_host = null
            }
            try {
                var digits_dialed = decodeURIComponent(result.cdr['variables'][0]['digits_dialed'][0])
            } catch (e) {
                digits_dialed = null
            }
            try {
                var tipificacion = decodeURIComponent(result.cdr['variables'][0]['tipificacion'][0])
            } catch (e) {
                tipificacion = null
            }
            try {
                var answer_stamp = decodeURIComponent(result.cdr['variables'][0]['answer_stamp'][0])
            } catch (e) {
                answer_stamp = null
            }
            try {
                var bridge_stamp = decodeURIComponent(result.cdr['variables'][0]['bridge_stamp'][0])
            } catch (e) {
                bridge_stamp = null
            }
            try {
                var end_stamp = decodeURIComponent(result.cdr['variables'][0]['end_stamp'][0])
            } catch (e) {
                end_stamp = null
            }
            try {
                var duration = decodeURIComponent(result.cdr['variables'][0]['duration'][0])
            } catch (e) {
                duration = null
            }
            try {
                var billsec = decodeURIComponent(result.cdr['variables'][0]['billsec'][0])
            } catch (e) {
                billsec = null
            }
            try {
                var DIALSTATUS = decodeURIComponent(result.cdr['variables'][0]['DIALSTATUS'][0])
            } catch (e) {
                DIALSTATUS = null
            }
            try {
                var proto_specific_hangup_cause = decodeURIComponent(result.cdr['variables'][0]['proto_specific_hangup_cause'][0])
            } catch (e) {
                proto_specific_hangup_cause = null
            }
            try {
                var sip_hangup_disposition = decodeURIComponent(result.cdr['variables'][0]['sip_hangup_disposition'][0])
            } catch (e) {
                sip_hangup_disposition = null
            }
            try {
                var sip_invite_failure_status = decodeURIComponent(result.cdr['variables'][0]['sip_invite_failure_status'][0])
            } catch (e) {
                sip_invite_failure_status = null
            }
            try {
                var sip_invite_failure_phrase = decodeURIComponent(result.cdr['variables'][0]['sip_invite_failure_phrase'][0])
            } catch (e) {
                sip_invite_failure_phrase = null
            }
            try {
                var hangup_cause = decodeURIComponent(result.cdr['variables'][0]['hangup_cause'][0])
            } catch (e) {
                hangup_cause = null
            }
            try {
                var hangup_cause_q850 = decodeURIComponent(result.cdr['variables'][0]['hangup_cause_q850'][0])
            } catch (e) {
                hangup_cause_q850 = null
            }
            try {
                var profile_start_stamp = decodeURIComponent(result.cdr['variables'][0]['profile_start_stamp'][0])
            } catch (e) {
                profile_start_stamp = null
            }
            try {
                var app_data = result.cdr['app_log'][0]['application'][7]['$']['app_data']
            } catch (e) {
                app_data = null
            } // -- Validar el Id
            try {
                var app_stamp = result.cdr['app_log'][0]['application'][7]['$']['app_stamp']
            } catch (e) {
                app_stamp = null
            } // -- Validar el Id
            try {
                var prefix_sant = decodeURIComponent(result.cdr['variables'][0]['prefix_sant'][0])
            } catch (e) {
                prefix_sant = null
            }
            try {
                var block_dnis = decodeURIComponent(result.cdr['variables'][0]['block_dnis'][0])
            } catch (e) {
                block_dnis = null
            }
            try {
                var banned = decodeURIComponent(result.cdr['variables'][0]['banned'][0])
            } catch (e) {
                banned = null
            }
            try {
                var callblocked = decodeURIComponent(result.cdr['variables'][0]['callblocked'][0])
            } catch (e) {
                callblocked = null
            }
            try {
                var altered = decodeURIComponent(result.cdr['variables'][0]['altered'][0])
            } catch (e) {
                altered = null
            }
            try {
                var flujo = decodeURIComponent(result.cdr['variables'][0]['flujo'][0])
            } catch (e) {
                flujo = null
            }
            try {
                var status_sel = decodeURIComponent(result.cdr['variables'][0]['status_sel'][0])
            } catch (e) {
                status_sel = null
            }
            try {
                var folio_int = decodeURIComponent(result.cdr['variables'][0]['folio_int'][0])
            } catch (e) {
                folio_int = null
            }
            try {
                var folio_sel = decodeURIComponent(result.cdr['variables'][0]['folio_sel'][0])
            } catch (e) {
                folio_sel = null
            }
            try {
                var phone = decodeURIComponent(result.cdr['variables'][0]['sip_req_user'][0].substring(result.cdr['variables'][0]['sip_req_user'][0].length - 10))
            } catch (e) {
                phone = null
            }
            try {
                var pin_values = decodeURIComponent(result.cdr['variables'][0]['pin_values'][0])
            } catch (e) {
                pin_values = null
            }
            try {
                var cventas = decodeURIComponent(result.cdr['variables'][0]['cventas'][0])
            } catch (e) {
                cventas = null
            }

            var row = {
                start_stamp: start_stamp,
                core_uuid: core_uuid,
                flags: flags,
                caps: caps,
                uuid: uuid,
                uuid_org: uuid_org,
                session_id: session_id,
                sip_from_user: sip_from_user,
                sip_from_uri: sip_from_uri,
                ep_codec_string: ep_codec_string,
                sip_local_network_addr: sip_local_network_addr,
                sip_network_ip: sip_network_ip,
                sip_via_protocol: sip_via_protocol,
                sip_invite_record_route: sip_invite_record_route,
                sip_req_user: sip_req_user,
                sip_req_uri: sip_req_uri,
                sip_to_user: sip_to_user,
                sip_to_uri: sip_to_uri,
                presence_id: presence_id,
                local_media_ip: local_media_ip,
                rtp_use_codec_name: rtp_use_codec_name,
                rtp_use_codec_rate: rtp_use_codec_rate,
                rtp_use_codec_ptime: rtp_use_codec_ptime,
                rtp_use_codec_channels: rtp_use_codec_channels,
                lcr_carrier: lcr_carrier,
                lcr_rate: lcr_rate,
                endpoint_disposition: endpoint_disposition,
                last_bridge_hangup_cause: last_bridge_hangup_cause,
                ivr_menu_status: ivr_menu_status,
                sip_contact_host: sip_contact_host,
                sip_term_status: sip_term_status,
                sip_from_display: sip_from_display,
                sip_full_from: sip_full_from,
                sip_user_agent: sip_user_agent,
                sip_via_host: sip_via_host,
                digits_dialed: digits_dialed,
                tipificacion: tipificacion,
                answer_stamp: answer_stamp,
                bridge_stamp: bridge_stamp,
                end_stamp: end_stamp,
                duration: duration,
                billsec: billsec,
                DIALSTATUS: DIALSTATUS,
                proto_specific_hangup_cause: proto_specific_hangup_cause,
                sip_hangup_disposition: sip_hangup_disposition,
                sip_invite_failure_status: sip_invite_failure_status,
                sip_invite_failure_phrase: sip_invite_failure_phrase,
                hangup_cause: hangup_cause,
                hangup_cause_q850: hangup_cause_q850,
                profile_start_stamp: profile_start_stamp,
                app_data: app_data,
                app_stamp: app_stamp,
                prefix_sant: prefix_sant,
                block_dnis: block_dnis,
                banned: banned,
                callblocked: callblocked,
                altered: altered,
                flujo: flujo,
                status_sel: status_sel,
                folio_int: folio_int,
                folio_sel: folio_sel,
                phone: phone,
                pin_values: pin_values,
                cventas: cventas,

            }

            connection.query('INSERT INTO cdrs_currentDay SET ?', row, function(err, result, fields) {
                if (err) {
                    console.error('BD[MYSQL] - Error al insertar : ' + err);
                } else {
                    if(numberConnection == limit){
                      connection.end()
                    }
                    console.log(result.insertId);
                }

            })
        });
    });
}
