'use client';

import React, { useState } from 'react';
import { MapContainer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getStateColor, getHoverColor } from '@/lib/mapStyles';
import { StateDetailModal } from '@/components/StateDetailModal';
import 'leaflet/dist/leaflet.css';
import type { Layer } from 'leaflet';

// State data for the modal
const stateData: Record<string, any> = {
    'Maharashtra': { name: 'महाराष्ट्र', culture: 'मराठी संस्कृति और बॉलीवुड', art: 'वार्ली पेंटिंग, पैठणी साड़ी', folk: 'लावणी, कोली नृत्य', famous: 'मुंबई, अजंता गुफाएं', festivals: 'गणेश चतुर्थी, गुड़ी पड़वा', food: 'वड़ा पाव, पुरन पोली' },
    'Rajasthan': { name: 'राजस्थान', culture: 'राजपूताना संस्कृति', art: 'मिनिएचर पेंटिंग, ब्लू पॉटरी', folk: 'घूमर नृत्य, कालबेलिया', famous: 'जयपुर पिंक सिटी, उदयपुर', festivals: 'तीज, गंगौर', food: 'दाल बाटी चूरमा, लाल मांस' },
    'Kerala': { name: 'केरल', culture: 'तटीय और मसाला संस्कृति', art: 'कथकली, थेय्यम', folk: 'मोहिनीअट्टम, तिरुवाथिरा', famous: 'बैकवाटर्स, मुन्नार', festivals: 'ओणम, थ्रिस्सूर पूरम', food: 'सद्या, फिश करी' },
    'Tamil Nadu': { name: 'तमिलनाडु', culture: 'द्रविड़ संस्कृति', art: 'तंजौर पेंटिंग, कांसे की मूर्तियां', folk: 'भरतनाट्यम, करागट्टम', famous: 'मीनाक्षी मंदिर, मरीना बीच', festivals: 'पोंगल, दिवाली', food: 'डोसा, सांबर' },
    'Punjab': { name: 'पंजाब', culture: 'सिख संस्कृति और कृषि', art: 'फुलकारी कढ़ाई, मिट्टी के बर्तन', folk: 'भांगड़ा, गिद्दा', famous: 'स्वर्ण मंदिर, वाघा बॉर्डर', festivals: 'बैसाखी, लोहड़ी', food: 'बटर चिकन, सरसों का साग' },
    'Gujarat': { name: 'गुजरात', culture: 'व्यापारिक संस्कृति', art: 'बंधनी, मिरर वर्क', folk: 'गरबा, डांडिया', famous: 'कच्छ का रण, सोमनाथ', festivals: 'नवरात्रि, पतंग उत्सव', food: 'ढोकला, थेपला' },
    'West Bengal': { name: 'पश्चिम बंगाल', culture: 'बंगाली बौद्धिक संस्कृति', art: 'कांथा कढ़ाई, टेराकोटा', folk: 'रबींद्र संगीत, बाउल', famous: 'विक्टोरिया मेमोरियल, दार्जीलिंग', festivals: 'दुर्गा पूजा, काली पूजा', food: 'मछली करी, रसगुल्ला' },
    'Karnataka': { name: 'कर्नाटक', culture: 'कन्नड़ संस्कृति', art: 'मैसूर पेंटिंग, चंदन की लकड़ी', folk: 'यक्षगान, डोल्लू कुनिता', famous: 'मैसूर पैलेस, हम्पी', festivals: 'दशहरा, उगाडी', food: 'बिसी बेले बाथ, मैसूर पाक' },
    'Uttar Pradesh': { name: 'उत्तर प्रदेश', culture: 'गंगा-जमुनी तहजीब', art: 'चिकनकारी, कालीन बुनाई', folk: 'कत्थक, नौटंकी', famous: 'ताज महल, वाराणसी, अयोध्या', festivals: 'होली, दिवाली, राम नवमी', food: 'बिरयानी, कबाब, पेठा' },
    'Madhya Pradesh': { name: 'मध्य प्रदेश', culture: 'मालवी और बुंदेली संस्कृति', art: 'गोंड पेंटिंग, बाग प्रिंट', folk: 'लावणी, तेरहताली', famous: 'खजुराहो, सांची, ग्वालियर', festivals: 'नवरात्रि, होली', food: 'दाल बाफला, भेल' },
    'Andhra Pradesh': { name: 'आंध्र प्रदेश', culture: 'तेलुगु संस्कृति', art: 'कलमकारी, निर्मल पेंटिंग', folk: 'कुचिपुड़ी नृत्य', famous: 'तिरुपति, हैदराबाद', festivals: 'उगाडी, दशहरा', food: 'बिरयानी, पुलिहोरा' },
    'Telangana': { name: 'तेलंगाना', culture: 'तेलुगु और निज़ामी संस्कृति', art: 'पेम्बर्थी मेटल क्राफ्ट', folk: 'पेरिनी शिवतांडवम', famous: 'हैदराबाद, रामोजी फिल्म सिटी', festivals: 'बोनालु, बठुकम्मा', food: 'हैदराबादी बिरयानी, हलीम' },
    'Odisha': { name: 'ओडिशा', culture: 'उड़िया संस्कृति', art: 'पट्टचित्र, पाम लीफ एनग्रेविंग', folk: 'ओडिसी नृत्य', famous: 'जगन्नाथ पुरी, कोणार्क', festivals: 'रथ यात्रा, दुर्गा पूजा', food: 'दाली, छेना पोड़ा' },
    'Bihar': { name: 'बिहार', culture: 'मैथिली और भोजपुरी संस्कृति', art: 'मधुबनी पेंटिंग', folk: 'जट-जटिन, सामा चकेवा', famous: 'बोधगया, नालंदा', festivals: 'छठ पूजा, करवा चौथ', food: 'लिट्टी चोखा, दाल पीठा' },
    'Jharkhand': { name: 'झारखंड', culture: 'आदिवासी संस्कृति', art: 'सोहराई और कोहबर पेंटिंग', folk: 'संथाली नृत्य, करम', famous: 'रांची, जमशेदपुर', festivals: 'सोहराई, करम', food: 'थेकुआ, मालपुआ' },
    'Assam': { name: 'असम', culture: 'असमिया संस्कृति', art: 'असम सिल्क, बांस और बेंत', folk: 'बिहू नृत्य', famous: 'काज़ीरंगा, गुवाहाटी', festivals: 'बिहू, दुर्गा पूजा', food: 'असम चाय, मछ तेंगा' },
    'Chhattisgarh': { name: 'छत्तीसगढ़', culture: 'छत्तीसगढ़ी संस्कृति', art: 'बेल मेटल क्राफ्ट', folk: 'पंडवानी, राउत नाचा', famous: 'रायपुर, भिलाई', festivals: 'हरेली, पोला', food: 'चीला, फरा' },
    'Haryana': { name: 'हरियाणा', culture: 'जाट संस्कृति', art: 'पारंपरिक हस्तशिल्प', folk: 'गिद्दा, खड़िया नृत्य', famous: 'कुरुक्षेत्र, पानीपत', festivals: 'तीज, करवा चौथ', food: 'कड़ी चावल, बाजरे की रोटी' },
    'Delhi': { name: 'दिल्ली', culture: 'मुगल और आधुनिक संस्कृति', art: 'मुगल वास्तुकला', folk: 'गज़ल, कव्वाली', famous: 'लाल किला, इंडिया गेट', festivals: 'दशहरा, होली', food: 'छोले भटूरे, पराठे' },
    'Himachal Pradesh': { name: 'हिमाचल प्रदेश', culture: 'पहाड़ी संस्कृति', art: 'चम्बा रुमाल, हिमाचली टोपी', folk: 'नाटी, जद्दा नृत्य', famous: 'शिमला, मनाली, धर्मशाला', festivals: 'दशहरा, दिवाली', food: 'धाम, सिड्डू, मद्रा' },
    'Uttarakhand': { name: 'उत्तराखंड', culture: 'गढ़वाली और कुमाऊंनी संस्कृति', art: 'ऐपण कला, काष्ठ कला', folk: 'कुमाऊंनी, गढ़वाली नृत्य', famous: 'हरिद्वार, ऋषिकेश, नैनीताल', festivals: 'कुंभ मेला, नंदा देवी राज जात', food: 'आलू के गुटके, बाल मिठाई' },
    'Jammu and Kashmir': { name: 'जम्मू और कश्मीर', culture: 'कश्मीरी संस्कृति और सूफी परंपरा', art: 'कश्मीरी हस्तशिल्प, पश्मीना शॉल', folk: 'रौफ, हफीज़ा नृत्य', famous: 'डल झील, गुलमर्ग, अमरनाथ', festivals: 'शिवरात्रि, बैसाखी', food: 'रोगन जोश, कहवा, वज़वान' },
    'Goa': { name: 'गोवा', culture: 'पुर्तगाली और कोंकणी संस्कृति', art: 'अज़ूलेजो टाइल्स', folk: 'देखनी, फुगड़ी', famous: 'बीच, चर्च', festivals: 'कार्निवल, गणेश चतुर्थी', food: 'फिश करी, बेबिंका' },
    'Tripura': { name: 'त्रिपुरा', culture: 'त्रिपुरी संस्कृति', art: 'हस्तकरघा, बांस', folk: 'होजागिरी नृत्य', famous: 'अगरतला, नीरमहल', festivals: 'गरिया, पोइला बैसाख', food: 'मुई बोरोक, चाखवी' },
    'Meghalaya': { name: 'मेघालय', culture: 'खासी और गारो संस्कृति', art: 'बांस और गन्ने की वस्तुएं', folk: 'नोंगक्रेम नृत्य', famous: 'शिलांग, चेरापूंजी', festivals: 'नोंगक्रेम, वांगला', food: 'जादोह, तुंगरिम्बाई' },
    'Manipur': { name: 'मणिपुर', culture: 'मैतेई संस्कृति', art: 'हस्तकरघा', folk: 'मणिपुरी नृत्य', famous: 'इम्फाल, लोकटक झील', festivals: 'होली, पोइला बैसाख', food: 'एरोम्बा, चगेम पोम्बा' },
    'Nagaland': { name: 'नागालैंड', culture: 'नागा जनजातीय संस्कृति', art: 'बुनाई, लकड़ी की नक्काशी', folk: 'युद्ध नृत्य', famous: 'कोहिमा, दीमापुर', festivals: 'हॉर्नबिल फेस्टिवल', food: 'स्मोक्ड मीट, नागा करी' },
    'Mizoram': { name: 'मिज़ोरम', culture: 'मिज़ो संस्कृति', art: 'हस्तकरघा, बांस', folk: 'चेराव नृत्य', famous: 'आइज़ॉल, रीक', festivals: 'चपचार कुट', food: 'बाई, वावकसा' },
    'Arunachal Pradesh': { name: 'अरुणाचल प्रदेश', culture: 'जनजातीय संस्कृति', art: 'हस्तकरघा, मुखौटे', folk: 'बार्डो छम', famous: 'तवांग, इटानगर', festivals: 'लोसार, सोलुंग', food: 'थुकपा, अपोंग' },
    'Sikkim': { name: 'सिक्किम', culture: 'लेप्चा, भूटिया, नेपाली संस्कृति', art: 'तिब्बती कला, थंगका', folk: 'सिंघी छम', famous: 'गंगटोक, कंचनजंगा', festivals: 'लोसार, सागा दावा', food: 'मोमो, गुंड्रुक' },
};

interface DynamicIndiaMapProps {
    className?: string;
}

// Zoom tracker component
function ZoomTracker({ onZoomChange }: { onZoomChange: (zoom: number) => void }) {
    const map = useMap();

    React.useEffect(() => {
        const handleZoom = () => {
            onZoomChange(map.getZoom());
        };

        map.on('zoomend', handleZoom);
        handleZoom();

        return () => {
            map.off('zoomend', handleZoom);
        };
    }, [map, onZoomChange]);

    return null;
}

// Component to add state labels
function StateLabels({ geoJsonData }: { geoJsonData: any }) {
    const map = useMap();

    React.useEffect(() => {
        if (!geoJsonData || !geoJsonData.features) return;

        const labels: L.Marker[] = [];
        const statePositions = new Map<string, [number, number]>();

        // Filter out island territories
        const excludedStates = ['Andaman and Nicobar Islands', 'Lakshadweep', 'Andaman and Nicobar', 'Lakshadweep Islands'];

        // Collect unique state positions
        geoJsonData.features.forEach((feature: any) => {
            const stateName = feature.properties.st_nm || feature.properties.ST_NM || feature.properties.name;
            if (excludedStates.includes(stateName) || statePositions.has(stateName)) return;

            const tempLayer = L.geoJSON(feature);
            const center = tempLayer.getBounds().getCenter();
            statePositions.set(stateName, [center.lat, center.lng]);
        });

        // Create simple text labels
        statePositions.forEach((position, stateName) => {
            const icon = L.divIcon({
                className: 'state-label-marker',
                html: `<div style="
                    font-size: 11px;
                    font-weight: 700;
                    color: #000000;
                    text-shadow: 
                        -1.5px -1.5px 0 #fff, 1.5px -1.5px 0 #fff,
                        -1.5px 1.5px 0 #fff, 1.5px 1.5px 0 #fff,
                        -1px -1px 0 #fff, 1px -1px 0 #fff,
                        -1px 1px 0 #fff, 1px 1px 0 #fff,
                        0 0 3px rgba(255,255,255,0.9);
                    white-space: nowrap;
                    pointer-events: none;
                    text-align: center;
                    font-family: 'Arial', sans-serif;
                ">${stateName}</div>`,
                iconSize: [100, 16],
                iconAnchor: [50, 8]
            });

            labels.push(L.marker(position, {
                icon, interactive: false, keyboard: false
            }).addTo(map));
        });

        return () => labels.forEach(label => map.removeLayer(label));
    }, [map, geoJsonData]);

    return null;
}

export function DynamicIndiaMap({ className }: DynamicIndiaMapProps) {
    const [currentZoom, setCurrentZoom] = useState(5);
    const [geoJsonData, setGeoJsonData] = useState<any>(null);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Load GeoJSON
    React.useEffect(() => {
        fetch('/data/india-states.geojson')
            .then(res => res.json())
            .then(data => setGeoJsonData(data))
            .catch(err => console.error('Error loading GeoJSON:', err));
    }, []);

    // GeoJSON styling
    const styleFeature = (feature: any) => {
        const stateName = feature.properties.st_nm || feature.properties.ST_NM || feature.properties.name;
        return {
            fillColor: getStateColor(stateName),
            weight: 2,
            color: '#000000',
            fillOpacity: 0.85,
        };
    };

    // GeoJSON interactions
    const onEachFeature = (feature: any, layer: Layer) => {
        const stateName = feature.properties.st_nm || feature.properties.ST_NM || feature.properties.name;

        // Don't add interactions for island territories
        const excludedStates = ['Andaman and Nicobar Islands', 'Lakshadweep', 'Andaman and Nicobar', 'Lakshadweep Islands'];
        if (excludedStates.includes(stateName)) {
            return;
        }

        layer.on({
            mouseover: () => {
                (layer as any).setStyle({
                    fillColor: getHoverColor(getStateColor(stateName)),
                    weight: 3,
                    color: '#ffffff',
                    fillOpacity: 0.95,
                });
            },
            mouseout: () => {
                (layer as any).setStyle({
                    fillColor: getStateColor(stateName),
                    weight: 2,
                    color: '#000000',
                    fillOpacity: 0.85,
                });
            },
            click: () => {
                setSelectedState(stateName);
                setIsModalOpen(true);
            },
        });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedState(null);
    };

    return (
        <div className={className}>
            {/* Map Container */}
            <div
                className="relative h-[700px] rounded-xl overflow-hidden shadow-2xl border border-border"
                style={{
                    backgroundImage: 'url(/images/cultural-diversity-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {/* Subtle overlay for better map visibility */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>

                <MapContainer
                    center={[22.5, 82.5]}
                    zoom={5}
                    minZoom={4.5}
                    maxZoom={8}
                    style={{ height: '100%', width: '100%', backgroundColor: 'transparent', position: 'relative', zIndex: 1 }}
                    scrollWheelZoom={true}
                    bounds={[[6.5, 68.0], [35.5, 97.5]]}
                    maxBounds={[[4, 65], [38, 100]]}
                    maxBoundsViscosity={1.0}
                    worldCopyJump={false}
                    zoomControl={true}
                    className="z-0"
                >
                    <ZoomTracker onZoomChange={setCurrentZoom} />

                    {/* State Boundaries */}
                    {geoJsonData && (
                        <>
                            <GeoJSON
                                key={JSON.stringify(geoJsonData)}
                                data={{
                                    ...geoJsonData,
                                    features: geoJsonData.features.filter((feature: any) => {
                                        const stateName = feature.properties.st_nm || feature.properties.ST_NM || feature.properties.name;
                                        const excludedStates = ['Andaman and Nicobar Islands', 'Lakshadweep', 'Andaman and Nicobar', 'Lakshadweep Islands'];
                                        return !excludedStates.includes(stateName);
                                    })
                                }}
                                style={styleFeature}
                                onEachFeature={onEachFeature}
                            />
                            <StateLabels geoJsonData={geoJsonData} />
                        </>
                    )}
                </MapContainer>
            </div>

            {/* State Detail Modal */}
            {selectedState && stateData[selectedState] && (
                <StateDetailModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    stateName={selectedState}
                    stateInfo={stateData[selectedState]}
                />
            )}
        </div>
    );
}
