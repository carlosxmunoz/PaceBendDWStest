//data

import React, { Component } from 'react';
import { PolyLine, Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Polyline } from 'react-leaflet';
import geojsonDataByLines from './a.json';


// //main component
// class Maps extends Component {
//     constructor() {
//         super();
//         this.state = {
//             geojsonDataByLines: geojsonDataByLines

//         };
//     }

//     polylineLineMaker() {
//         const geojsonDataByLines = this.state.geojsonDataByLines;

//         const testMe = geojsonDataByLines.features.map((cord) => {
//             console.log('testme1', testMe)
//             return cord.geometry.coordinates;
//         });
//         console.log('testme', testMe)
//         return testMe;
//     }

//     polylineLineColor() {
//         //The color for the polylines shoud go here 
//         const geojsonDataByLines = this.state.geojsonDataByLines;

//         const testMe = geojsonDataByLines.features.map((cord) => {
//             return cord.properties.color;
//         });
//         console.log(testMe)
//         return testMe;
//     }

//     render() {
//         return (
//             <Map>
//                 {geojsonDataByLines.features.map((feature) => (
//                     <Polyline
//                         positions={feature.geometry.coordinates}
//                         color={feature.properties.color}
//                     />
//                 ))}
//             </Map>
//         );
//     }
// }




class Maps extends Component {
    constructor() {
        super();
        this.state = {
            // lat: 51.505,
            // lng: -0.09,
            zoom: 16,
            // geojsonDataByLines: geojsonDataByLines
        }
    }

    // polylineLineMaker() {
    //     const geojsonDataByLines = this.state.geojsonDataByLines;

    //     const testMe = geojsonDataByLines.features.map((cord) => {
    //         console.log('testme1', testMe)
    //         return cord.geometry.coordinates;
    //     });
    //     console.log('testme', testMe)
    //     return testMe;
    // }

    // polylineLineColor() {
    //     //The color for the polylines shoud go here 
    //     const geojsonDataByLines = this.state.geojsonDataByLines;

    //     const testMe = geojsonDataByLines.features.map((cord) => {
    //         return cord.properties.color;
    //     });
    //     console.log(testMe)
    //     return testMe;
    // }

    decode(encoded) {
        // array that holds the points
        var points = []
        var index = 0, len = encoded.length;
        var lat = 0, lng = 0;
        while (index < len) {
            var b, shift = 0, result = 0;
            do {
                b = encoded.charAt(index++).charCodeAt(0) - 63;//finds ascii                                                                                    //and substract it by 63
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
            lat += dlat;
            shift = 0;
            result = 0;
            do {
                b = encoded.charAt(index++).charCodeAt(0) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
            lng += dlng;
            points.push({ latitude: (lat / 1E5), longitude: (lng / 1E5) })
        }
        return points
    }

    render() {
        // const position = [this.state.lat, this.state.lng];
        // const polyline = "wupxDb~esQuA|AUHQAGDm@nAi@`@UNEFEl@J|@C^AJ_@v@Mh@?JDJVd@?^IZi@~@o@^EJ?JBFZPBJFFDZA^g@Jc@ASDa@B_@RCH?FFDb@HDN?FEFAFLPFABC@QDGDD@VCXLRDX?LFFD?@OLc@A[PEVOD@@FAHUd@AF@JJEFQFEFERAFDHNNBL?L[\\W?IHGJ?HHAZUHUCMBUTk@\\?LEHEFUNGEg@OG?UHKTSVMTe@f@c@^W?EETk@ZDHEL[HCPMDM?MHa@AIIMOIKADS@[G[IQEGSCQ?KDM^OFQP_@v@o@p@MV[XI`@AHDZ^H^?TJE\\Ff@?\\BJTNNBHATa@^_@BIFGPIJQNMRE\\MHB\\ZHADGHUDCLWAa@z@c@HOf@g@FKHITKb@KTMTOj@k@r@[TOh@k@bAyATi@Lk@B]Bu@CO?cBQq@MYSSIAKOAQBUAMGSAQZAXPN@N?XIBIGg@IMEMOIAKL[Pw@h@g@H?LTLF`@?NHb@l@XRX@FGFAXNP?FI@OFCDGBWN@No@FIp@Of@YBKEGKGMCCEVe@`@_@LO?]DMTQ~@e@XI\\?n@TR@TFvAh@b@f@PLTJNCJYHK?MK_@HOVU@WISSUWGCEGe@Sm@A_@CMECAQFQ\\SF?HHHp@FFPNH?VHDL@HKf@Cd@?HBN@t@Hb@HJXNDFBTEd@AV[Xa@R[?a@ESDS\\UJECEc@CQEGOE]]_@QEO?UGCo@ISDQEUACDWp@Mf@i@l@e@`@CD?REP]T?FH@PGZAFH?DCFKF]HMNm@jDk@|A_@xA?`@HLlAPn@l@HPI`@IJM@OEUMQCG@WZGBG?c@OODEJDJRLDHHd@DBNGFBJAV_@FEH?h@Np@ZNNZLXVLV@TIHi@GYMa@Ag@@aAF]JS@OAe@Oi@AYBMAKKEO?]DW@a@@ENIh@k@@]KSEAo@FOFKPKt@[p@Ef@F`@FDR@LDVBRAb@DTVHRLPPX@TMZAPAx@Cf@?j@G|@@P`@bA@JCLGLUTSNMBiA|@WIGKIs@GSKQmAq@KAKDM`@]^IPWZYb@qAxAWJMGS@y@d@Sh@EZ]p@Ur@INIDMGGWAI?KIW?UBEZDPGNa@^c@Jy@LI`@ETI\\ARWBMLMHBb@UBKb@w@J[b@QDI@IEOIAMXS@KCUBKd@IJG@EHEPEDWBEBMVWXG?SFG?QPK@KEM?I@OREJAJ?XCJIFUHEF?JEF[CORIDKAUQOSFu@HKDEH?d@ZJ?HCFIBIJGBMGMAM@MRBVC@KJWJEb@k@BK@WFYHILANQDBDTHJNCBITMDGAMCGAWGUIGI@wBtAURkEtEGHKZGv@FXDFVRf@FRNHLFb@HhAN~@?NO^Wj@GFG@GAGGMWCMAe@@KLMF?HDN?Ae@Yg@Me@U[GUIE@XNVBf@DFLAHH?DEPCB]EOQBQDE?IEECUIUIm@MSAWS]G_@MYCQM_@AQD}@FS\\OD@?LITMP@VDBJGb@a@j@_@JCLKHCTSt@KVMRSLSNMH]LGBIl@c@r@UJGHUDYNWLOTFLNDPKFCRFHLA~AsAr@c@XSd@o@Js@NMPEP@hADvDHlB?^DX@\\GTOPSHAZBLAt@SP@JAFQDo@RQJ_@DCEE_@IM@ED?DHR@Hc@b@KDI?EC?SFSAIN_@EQCEGBKZG@EACG@KHUAEWEWJEAEE?EPKBEIAMOSCGCCSBGJBv@b@F?HJh@\\JJFDDAr@u@BM@YRYHe@LYBKGIEA_@DG?QGUMQAKn@]XCB?REHu@B_@CW@GAEOF_@O_@GEQ?]MIIEIAM@MD[FMHGJCHAd@FJ[BQFGJSFGLDJOEW?KEETLr@XRKD?JBHHGLWLIPOPHDLCHD?HGLDDRBDDHPFAFILYXMBMIWBOHMTKFA\\XH^FFPDNGDB@HCPEDWFGF?HLJ@FCFMH[HCBEL@P?DDDJEHKFEPA\\[l@_BD[CG[QOQQGGAEFBFGDE?_@Um@WGGI@e@RGK@GBCNE?Cc@GMGe@DQKI?EGKEO?GG?QKM?IFAVLVAEIa@OCGCYBOBLDDZRPD`Ap@`@L\\BTHz@`@`Bp@^XLEFM@_@C_@U}@MM]Eg@OUS}@By@JK@YNEACEN_@HGPGDGbAUb@EDEG[KAM@[LI@EAAI@KLODSJODAPL\\DVETMRULI@KCM?KFU@OKS[QEQIqA@oADa@?M[MSCKICCBEQu@ECM@YTc@PQ?c@LQPIBu@?OCKIi@yAIY?SZq@BYDEF?TV@DCTUTAFFFRBDDLh@PXDBL?LIAI_@MKO?g@CQEMDLBBJMPm@Jo@ASEGPSDWAGGGKEI?CDCd@K\\?VELGJM@KIAMV_A?a@KO]Sk@e@UKW?OHKLGP@DJHPB\\?JBd@TFTKx@WZOj@IHI?AK@GRm@JIBG?SCGWIEEM_@KMMGE@GH?\\Tf@@L[TA^IZg@`Ac@Ja@XW?OCUk@a@QK?c@SQCEEEUGG]EU[EEG?E@OPGV@PDDJ@BDADUTKh@ELKJg@JmBPQ?YCWKIM?YZ_ANUj@OhAI^JDHR?JO@m@VWJSFEj@RRV\\BDBBLFH\\Nd@F\\XTJPDN?NCFEFY?SEI?GRMHQIACEEEAKBGJQBa@He@AMWMGQ@KJc@DADB?FILBFLMR?HCDG@ICCMASME?[RODYAeALKFQRE?AE@KPa@f@EPBBIUOAIGAWJQN]DGB@JCHDLHDBNAF[JAD?HRJT?VG^_@DANH`@^@HCVILKc@K?KLFP?HKB[QI?G@QR@Fn@FTJD?TOz@kAFCCR?NQNCXOVUBCJC\\JJF@DHADGDKAEE[g@IE]AWSQEIEAGLUAOII_@GaAF]To@XUFKA{@b@IEMa@KGK?_@FK?i@Kc@BUFcAAg@LG?y@W{@FKEOQ_@@KDe@h@u@f@QRMTALCt@@Fj@WN_@@EMY?ONAD@BBCb@B@LYVKNKDM@[DEHB^XP@FOFED?F?`@P^C^@ZBRFb@O`@?RQNAH@BHBPIVG@YSOAS?g@LU@MIWIm@?OCI?KDAJFFZJBD@LKHG@KCQOEAQ?[EI@}@Xa@VKNCNNZE@KCKDICUOQCYJEZJZ?HXXXJj@DHG|@a@b@G\\OZCNy@DIb@YZFFGFOPI`@Al@ILF^`@FBF?HIV_@FEAH";
        const polyline = this.props.polylines.polyline;

        var polylinePointsDict = this.decode(polyline)
        var i;
        var polylinePoints = [];
        for (i = 0; i < polylinePointsDict.length; i++) {
            polylinePoints.push([polylinePointsDict[i].latitude, polylinePointsDict[i].longitude]);
        }
        const position = polylinePoints[0];
        const endPosition = polylinePoints[polylinePoints.length-1]
        console.log('points', polylinePoints);
        // var polylinePoints = [
        //     [37.781814, -122.404740],
        //     [37.781719, -122.404637],
        //     [37.781489, -122.404949],
        //     [37.780704, -122.403945],
        //     [37.780012, -122.404827]
        // ];
        return (
            <div>
                <Map
                    style={{ height: "900px" }}
                    center={position}
                    zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                    <Marker position={position}>
                        <Popup>
                            <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                        </Popup>
                    </Marker>

                    <Marker position={endPosition}>
                        <Popup>
                            <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                        </Popup>
                    </Marker>
                    {geojsonDataByLines.features.map((feature) => (
                        <Polyline
                            positions={polylinePoints}
                            color={feature.properties.color}
                        />
                    ))}
                    {/* <Polyline ref="polyline" polylines={polylinePoints} /> */}

                </Map>

            </div>

        )
    }
}

export default Maps;