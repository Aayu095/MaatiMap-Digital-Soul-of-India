import React, { useState } from 'react';
import { X } from 'lucide-react';

interface StateInfo {
    name: string;
    culture: string;
    art: string;
    folk: string;
    famous: string;
    festivals: string;
    food: string;
}

type StateDataType = {
    [key: string]: StateInfo;
};

const InteractiveIndiaMap = () => {
    const [selectedState, setSelectedState] = useState<StateInfo | null>(null);

    const stateData: StateDataType = {
        'Jammu and Kashmir': {
            name: 'जम्मू और कश्मीर',
            culture: 'कश्मीरी संस्कृति और सूफी परंपरा',
            art: 'कश्मीरी हस्तशिल्प, पश्मीना शॉल',
            folk: 'रौफ, हफीज़ा नृत्य',
            famous: 'डल झील, गुलमर्ग, अमरनाथ',
            festivals: 'शिवरात्रि, बैसाखी',
            food: 'रोगन जोश, कहवा, वज़वान'
        },
        'Himachal Pradesh': {
            name: 'हिमाचल प्रदेश',
            culture: 'पहाड़ी संस्कृति',
            art: 'चम्बा रुमाल, हिमाचली टोपी',
            folk: 'नाटी, जद्दा नृत्य',
            famous: 'शिमला, मनाली, धर्मशाला',
            festivals: 'दशहरा, दिवाली',
            food: 'धाम, सिड्डू, मद्रा'
        },
        'Punjab': {
            name: 'पंजाब',
            culture: 'सिख संस्कृति और कृषि',
            art: 'फुलकारी कढ़ाई, मिट्टी के बर्तन',
            folk: 'भांगड़ा, गिद्दा',
            famous: 'स्वर्ण मंदिर, वाघा बॉर्डर',
            festivals: 'बैसाखी, लोहड़ी',
            food: 'बटर चिकन, सरसों का साग'
        },
        'Haryana': {
            name: 'हरियाणा',
            culture: 'जाट संस्कृति',
            art: 'पारंपरिक हस्तशिल्प',
            folk: 'गिद्दा, खड़िया नृत्य',
            famous: 'कुरुक्षेत्र, पानीपत',
            festivals: 'तीज, करवा चौथ',
            food: 'कड़ी चावल, बाजरे की रोटी'
        },
        'Delhi': {
            name: 'दिल्ली',
            culture: 'मुगल और आधुनिक संस्कृति',
            art: 'मुगल वास्तुकला',
            folk: 'गज़ल, कव्वाली',
            famous: 'लाल किला, इंडिया गेट',
            festivals: 'दशहरा, होली',
            food: 'छोले भटूरे, पराठे'
        },
        'Uttarakhand': {
            name: 'उत्तराखंड',
            culture: 'गढ़वाली और कुमाऊंनी संस्कृति',
            art: 'ऐपण कला, काष्ठ कला',
            folk: 'कुमाऊंनी, गढ़वाली नृत्य',
            famous: 'हरिद्वार, ऋषिकेश, नैनीताल',
            festivals: 'कुंभ मेला, नंदा देवी राज जात',
            food: 'आलू के गुटके, बाल मिठाई'
        },
        'Uttar Pradesh': {
            name: 'उत्तर प्रदेश',
            culture: 'गंगा-जमुनी तहजीब',
            art: 'चिकनकारी, कालीन बुनाई',
            folk: 'कत्थक, नौटंकी',
            famous: 'ताज महल, वाराणसी, अयोध्या',
            festivals: 'होली, दिवाली, राम नवमी',
            food: 'बिरयानी, कबाब, पेठा'
        },
        'Bihar': {
            name: 'बिहार',
            culture: 'मैथिली और भोजपुरी संस्कृति',
            art: 'मधुबनी पेंटिंग',
            folk: 'जट-जटिन, सामा चकेवा',
            famous: 'बोधगया, नालंदा',
            festivals: 'छठ पूजा, करवा चौथ',
            food: 'लिट्टी चोखा, दाल पीठा'
        },
        'Jharkhand': {
            name: 'झारखंड',
            culture: 'आदिवासी संस्कृति',
            art: 'सोहराई और कोहबर पेंटिंग',
            folk: 'संथाली नृत्य, करम',
            famous: 'रांची, जमशेदपुर',
            festivals: 'सोहराई, करम',
            food: 'थेकुआ, मालपुआ'
        },
        'West Bengal': {
            name: 'पश्चिम बंगाल',
            culture: 'बंगाली बौद्धिक संस्कृति',
            art: 'कांथा कढ़ाई, टेराकोटा',
            folk: 'रबींद्र संगीत, बाउल',
            famous: 'विक्टोरिया मेमोरियल, दार्जीलिंग',
            festivals: 'दुर्गा पूजा, काली पूजा',
            food: 'मछली करी, रसगुल्ला'
        },
        'Odisha': {
            name: 'ओडिशा',
            culture: 'उड़िया संस्कृति',
            art: 'पट्टचित्र, पाम लीफ एनग्रेविंग',
            folk: 'ओडिसी नृत्य',
            famous: 'जगन्नाथ पुरी, कोणार्क',
            festivals: 'रथ यात्रा, दुर्गा पूजा',
            food: 'दाली, छेना पोड़ा'
        },
        'Chhattisgarh': {
            name: 'छत्तीसगढ़',
            culture: 'छत्तीसगढ़ी संस्कृति',
            art: 'बेल मेटल क्राफ्ट',
            folk: 'पंडवानी, राउत नाचा',
            famous: 'रायपुर, भिलाई',
            festivals: 'हरेली, पोला',
            food: 'चीला, फरा'
        },
        'Madhya Pradesh': {
            name: 'मध्य प्रदेश',
            culture: 'मालवी और बुंदेली संस्कृति',
            art: 'गोंड पेंटिंग, बाग प्रिंट',
            folk: 'लावणी, तेरहताली',
            famous: 'खजुराहो, सांची, ग्वालियर',
            festivals: 'नवरात्रि, होली',
            food: 'दाल बाफला, भेल'
        },
        'Rajasthan': {
            name: 'राजस्थान',
            culture: 'राजपूताना संस्कृति',
            art: 'मिनिएचर पेंटिंग, ब्लू पॉटरी',
            folk: 'घूमर नृत्य, कालबेलिया',
            famous: 'जयपुर पिंक सिटी, उदयपुर',
            festivals: 'तीज, गंगौर',
            food: 'दाल बाटी चूरमा, लाल मांस'
        },
        'Gujarat': {
            name: 'गुजरात',
            culture: 'व्यापारिक संस्कृति',
            art: 'बंधनी, मिरर वर्क',
            folk: 'गरबा, डांडिया',
            famous: 'कच्छ का रण, सोमनाथ',
            festivals: 'नवरात्रि, पतंग उत्सव',
            food: 'ढोकला, थेपला'
        },
        'Maharashtra': {
            name: 'महाराष्ट्र',
            culture: 'मराठी संस्कृति और बॉलीवुड',
            art: 'वार्ली पेंटिंग, पैठणी साड़ी',
            folk: 'लावणी, कोली नृत्य',
            famous: 'मुंबई, अजंता गुफाएं',
            festivals: 'गणेश चतुर्थी, गुड़ी पड़वा',
            food: 'वड़ा पाव, पुरन पोली'
        },
        'Goa': {
            name: 'गोवा',
            culture: 'पुर्तगाली और कोंकणी संस्कृति',
            art: 'अज़ूलेजो टाइल्स',
            folk: 'देखनी, फुगड़ी',
            famous: 'बीच, चर्च',
            festivals: 'कार्निवल, गणेश चतुर्थी',
            food: 'फिश करी, बेबिंका'
        },
        'Karnataka': {
            name: 'कर्नाटक',
            culture: 'कन्नड़ संस्कृति',
            art: 'मैसूर पेंटिंग, चंदन की लकड़ी',
            folk: 'यक्षगान, डोल्लू कुनिता',
            famous: 'मैसूर पैलेस, हम्पी',
            festivals: 'दशहरा, उगाडी',
            food: 'बिसी बेले बाथ, मैसूर पाक'
        },
        'Andhra Pradesh': {
            name: 'आंध्र प्रदेश',
            culture: 'तेलुगु संस्कृति',
            art: 'कलमकारी, निर्मल पेंटिंग',
            folk: 'कुचिपुड़ी नृत्य',
            famous: 'तिरुपति, हैदराबाद',
            festivals: 'उगाडी, दशहरा',
            food: 'बिरयानी, पुलिहोरा'
        },
        'Telangana': {
            name: 'तेलंगाना',
            culture: 'तेलुगु और निज़ामी संस्कृति',
            art: 'पेम्बर्थी मेटल क्राफ्ट',
            folk: 'पेरिनी शिवतांडवम',
            famous: 'हैदराबाद, रामोजी फिल्म सिटी',
            festivals: 'बोनालु, बठुकम्मा',
            food: 'हैदराबादी बिरयानी, हलीम'
        },
        'Kerala': {
            name: 'केरल',
            culture: 'तटीय और मसाला संस्कृति',
            art: 'कथकली, थेय्यम',
            folk: 'मोहिनीअट्टम, तिरुवाथिरा',
            famous: 'बैकवाटर्स, मुन्नार',
            festivals: 'ओणम, थ्रिस्सूर पूरम',
            food: 'सद्या, फिश करी'
        },
        'Tamil Nadu': {
            name: 'तमिलनाडु',
            culture: 'द्रविड़ संस्कृति',
            art: 'तंजौर पेंटिंग, कांसे की मूर्तियां',
            folk: 'भरतनाट्यम, करागट्टम',
            famous: 'मीनाक्षी मंदिर, मरीना बीच',
            festivals: 'पोंगल, दिवाली',
            food: 'डोसा, सांबर'
        },
        'Assam': {
            name: 'असम',
            culture: 'असमिया संस्कृति',
            art: 'असम सिल्क, बांस और बेंत',
            folk: 'बिहू नृत्य',
            famous: 'काज़ीरंगा, गुवाहाटी',
            festivals: 'बिहू, दुर्गा पूजा',
            food: 'असम चाय, मछ तेंगा'
        },
        'Meghalaya': {
            name: 'मेघालय',
            culture: 'खासी और गारो संस्कृति',
            art: 'बांस और गन्ने की वस्तुएं',
            folk: 'नोंगक्रेम नृत्य',
            famous: 'शिलांग, चेरापूंजी',
            festivals: 'नोंगक्रेम, वांगला',
            food: 'जादोह, तुंगरिम्बाई'
        },
        'Manipur': {
            name: 'मणिपुर',
            culture: 'मैतेई संस्कृति',
            art: 'हस्तकरघा',
            folk: 'मणिपुरी नृत्य',
            famous: 'इम्फाल, लोकटक झील',
            festivals: 'होली, पोइला बैसाख',
            food: 'एरोम्बा, चगेम पोम्बा'
        },
        'Tripura': {
            name: 'त्रिपुरा',
            culture: 'त्रिपुरी संस्कृति',
            art: 'हस्तकरघा, बांस',
            folk: 'होजागिरी नृत्य',
            famous: 'अगरतला, नीरमहल',
            festivals: 'गरिया, पोइला बैसाख',
            food: 'मुई बोरोक, चाखवी'
        },
        'Nagaland': {
            name: 'नागालैंड',
            culture: 'नागा जनजातीय संस्कृति',
            art: 'बुनाई, लकड़ी की नक्काशी',
            folk: 'युद्ध नृत्य',
            famous: 'कोहिमा, दीमापुर',
            festivals: 'हॉर्नबिल फेस्टिवल',
            food: 'स्मोक्ड मीट, नागा करी'
        },
        'Mizoram': {
            name: 'मिज़ोरम',
            culture: 'मिज़ो संस्कृति',
            art: 'हस्तकरघा, बांस',
            folk: 'चेराव नृत्य',
            famous: 'आइज़ॉल, रीक',
            festivals: 'चपचार कुट',
            food: 'बाई, वावकसा'
        },
        'Arunachal Pradesh': {
            name: 'अरुणाचल प्रदेश',
            culture: 'जनजातीय संस्कृति',
            art: 'हस्तकरघा, मुखौटे',
            folk: 'बार्डो छम',
            famous: 'तवांग, इटानगर',
            festivals: 'लोसार, सोलुंग',
            food: 'थुकपा, अपोंग'
        },
        'Sikkim': {
            name: 'सिक्किम',
            culture: 'लेप्चा, भूटिया, नेपाली संस्कृति',
            art: 'तिब्बती कला, थंगका',
            folk: 'सिंघी छम',
            famous: 'गंगटोक, कंचनजंगा',
            festivals: 'लोसार, सागा दावा',
            food: 'मोमो, गुंड्रुक'
        }
    };

    const handleStateClick = (stateName: keyof typeof stateData) => {
        if (stateData[stateName]) {
            setSelectedState(stateData[stateName]);
        }
    };

    const closeModal = () => {
        setSelectedState(null);
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
                    भारत का सांस्कृतिक मानचित्र
                </h1>
                <p className="text-center text-gray-600 mb-8 text-lg">
                    राज्यों पर क्लिक करके उनकी संस्कृति और कला के बारे में जानें
                </p>

                {/* Complete India Map SVG */}
                <div className="flex justify-center">
                    <svg
                        width="900"
                        height="800"
                        viewBox="0 0 900 800"
                        className="border-2 border-gray-300 rounded-lg shadow-lg bg-white"
                    >
                        {/* Jammu and Kashmir */}
                        <path
                            d="M300 50 L380 45 L420 80 L400 120 L350 125 L300 100 Z"
                            fill="#FF6B6B"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-red-400 transition-colors duration-200"
                            onClick={() => handleStateClick('Jammu and Kashmir')}
                        />
                        <text x="360" y="85" textAnchor="middle" className="text-xs font-semibold pointer-events-none">J&K</text>

                        {/* Himachal Pradesh */}
                        <path
                            d="M320 100 L400 95 L430 130 L380 140 L340 135 Z"
                            fill="#4ECDC4"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-teal-300 transition-colors duration-200"
                            onClick={() => handleStateClick('Himachal Pradesh')}
                        />
                        <text x="375" y="120" textAnchor="middle" className="text-xs font-semibold pointer-events-none">HP</text>

                        {/* Punjab */}
                        <path
                            d="M280 120 L340 115 L360 150 L320 155 L290 145 Z"
                            fill="#45B7D1"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-blue-300 transition-colors duration-200"
                            onClick={() => handleStateClick('Punjab')}
                        />
                        <text x="320" y="140" textAnchor="middle" className="text-xs font-semibold pointer-events-none">PB</text>

                        {/* Haryana */}
                        <path
                            d="M320 155 L380 150 L400 180 L370 185 L340 175 Z"
                            fill="#96CEB4"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-green-300 transition-colors duration-200"
                            onClick={() => handleStateClick('Haryana')}
                        />
                        <text x="360" y="170" textAnchor="middle" className="text-xs font-semibold pointer-events-none">HR</text>

                        {/* Delhi */}
                        <path
                            d="M370 175 L390 170 L395 185 L380 190 L375 185 Z"
                            fill="#FECA57"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-yellow-300 transition-colors duration-200"
                            onClick={() => handleStateClick('Delhi')}
                        />
                        <text x="382" y="180" textAnchor="middle" className="text-xs font-semibold pointer-events-none">DL</text>

                        {/* Uttarakhand */}
                        <path
                            d="M400 140 L480 135 L500 170 L460 175 L420 165 Z"
                            fill="#FF9FF3"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-pink-300 transition-colors duration-200"
                            onClick={() => handleStateClick('Uttarakhand')}
                        />
                        <text x="450" y="160" textAnchor="middle" className="text-xs font-semibold pointer-events-none">UK</text>

                        {/* Uttar Pradesh */}
                        <path
                            d="M400 180 L580 175 L600 220 L550 235 L450 240 L380 220 Z"
                            fill="#FFD93D"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-yellow-200 transition-colors duration-200"
                            onClick={() => handleStateClick('Uttar Pradesh')}
                        />
                        <text x="490" y="210" textAnchor="middle" className="text-xs font-semibold pointer-events-none">UP</text>

                        {/* Bihar */}
                        <path
                            d="M580 220 L660 215 L680 250 L640 260 L600 255 Z"
                            fill="#A8E6CF"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-green-200 transition-colors duration-200"
                            onClick={() => handleStateClick('Bihar')}
                        />
                        <text x="640" y="240" textAnchor="middle" className="text-xs font-semibold pointer-events-none">BR</text>

                        {/* Jharkhand */}
                        <path
                            d="M580 255 L640 250 L660 290 L620 300 L590 285 Z"
                            fill="#DDA0DD"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-purple-300 transition-colors duration-200"
                            onClick={() => handleStateClick('Jharkhand')}
                        />
                        <text x="620" y="275" textAnchor="middle" className="text-xs font-semibold pointer-events-none">JH</text>

                        {/* West Bengal */}
                        <path
                            d="M660 250 L740 245 L760 290 L720 310 L680 295 Z"
                            fill="#87CEEB"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-sky-300 transition-colors duration-200"
                            onClick={() => handleStateClick('West Bengal')}
                        />
                        <text x="710" y="275" textAnchor="middle" className="text-xs font-semibold pointer-events-none">WB</text>

                        {/* Odisha */}
                        <path
                            d="M620 300 L680 295 L700 340 L660 350 L630 330 Z"
                            fill="#98FB98"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-green-300 transition-colors duration-200"
                            onClick={() => handleStateClick('Odisha')}
                        />
                        <text x="660" y="325" textAnchor="middle" className="text-xs font-semibold pointer-events-none">OR</text>

                        {/* Chhattisgarh */}
                        <path
                            d="M520 280 L590 275 L610 320 L570 330 L540 315 Z"
                            fill="#F0E68C"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-yellow-300 transition-colors duration-200"
                            onClick={() => handleStateClick('Chhattisgarh')}
                        />
                        <text x="565" y="305" textAnchor="middle" className="text-xs font-semibold pointer-events-none">CG</text>

                        {/* Madhya Pradesh */}
                        <path
                            d="M380 240 L540 235 L560 290 L480 300 L420 285 Z"
                            fill="#CD853F"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-yellow-600 transition-colors duration-200"
                            onClick={() => handleStateClick('Madhya Pradesh')}
                        />
                        <text x="470" y="265" textAnchor="middle" className="text-xs font-semibold pointer-events-none">MP</text>

                        {/* Rajasthan */}
                        <path
                            d="M200 200 L380 195 L400 280 L350 320 L250 315 L180 260 Z"
                            fill="#DC143C"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-red-300 transition-colors duration-200"
                            onClick={() => handleStateClick('Rajasthan')}
                        />
                        <text x="290" y="255" textAnchor="middle" className="text-xs font-semibold pointer-events-none">RJ</text>

                        {/* Gujarat */}
                        <path
                            d="M120 280 L250 275 L280 350 L220 400 L150 380 L100 330 Z"
                            fill="#32CD32"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-green-400 transition-colors duration-200"
                            onClick={() => handleStateClick('Gujarat')}
                        />
                        <text x="190" y="335" textAnchor="middle" className="text-xs font-semibold pointer-events-none">GJ</text>

                        {/* Maharashtra */}
                        <path
                            d="M280 350 L480 345 L520 420 L450 450 L350 440 L280 400 Z"
                            fill="#FF4500"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-orange-400 transition-colors duration-200"
                            onClick={() => handleStateClick('Maharashtra')}
                        />
                        <text x="380" y="395" textAnchor="middle" className="text-xs font-semibold pointer-events-none">MH</text>

                        {/* Goa */}
                        <path
                            d="M280 450 L320 445 L330 470 L310 480 L285 475 Z"
                            fill="#FFB6C1"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-pink-300 transition-colors duration-200"
                            onClick={() => handleStateClick('Goa')}
                        />
                        <text x="305" y="465" textAnchor="middle" className="text-xs font-semibold pointer-events-none">GA</text>

                        {/* Karnataka */}
                        <path
                            d="M330 470 L480 465 L520 520 L470 560 L380 555 L340 520 Z"
                            fill="#9370DB"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-purple-400 transition-colors duration-200"
                            onClick={() => handleStateClick('Karnataka')}
                        />
                        <text x="425" y="515" textAnchor="middle" className="text-xs font-semibold pointer-events-none">KA</text>

                        {/* Andhra Pradesh */}
                        <path
                            d="M520 420 L620 415 L650 480 L580 520 L520 510 Z"
                            fill="#20B2AA"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-teal-400 transition-colors duration-200"
                            onClick={() => handleStateClick('Andhra Pradesh')}
                        />
                        <text x="575" y="465" textAnchor="middle" className="text-xs font-semibold pointer-events-none">AP</text>

                        {/* Telangana */}
                        <path
                            d="M520 380 L580 375 L600 420 L560 430 L530 415 Z"
                            fill="#FFA500"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-orange-300 transition-colors duration-200"
                            onClick={() => handleStateClick('Telangana')}
                        />
                        <text x="555" y="400" textAnchor="middle" className="text-xs font-semibold pointer-events-none">TS</text>

                        {/* Kerala */}
                        <path
                            d="M340 560 L420 555 L440 600 L400 630 L360 625 L340 590 Z"
                            fill="#228B22"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-green-500 transition-colors duration-200"
                            onClick={() => handleStateClick('Kerala')}
                        />
                        <text x="390" y="590" textAnchor="middle" className="text-xs font-semibold pointer-events-none">KL</text>

                        {/* Tamil Nadu */}
                        <path
                            d="M470 560 L580 555 L620 600 L580 640 L520 635 L480 610 Z"
                            fill="#FF1493"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-pink-400 transition-colors duration-200"
                            onClick={() => handleStateClick('Tamil Nadu')}
                        />
                        <text x="535" y="600" textAnchor="middle" className="text-xs font-semibold pointer-events-none">TN</text>

                        {/* Assam */}
                        <path
                            d="M720 220 L800 215 L820 250 L780 265 L740 260 Z"
                            fill="#00CED1"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-cyan-300 transition-colors duration-200"
                            onClick={() => handleStateClick('Assam')}
                        />
                        <text x="770" y="245" textAnchor="middle" className="text-xs font-semibold pointer-events-none">AS</text>

                        {/* Meghalaya */}
                        <path
                            d="M760 265 L800 260 L810 285 L785 295 L765 290 Z"
                            fill="#9ACD32"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-yellow-400 transition-colors duration-200"
                            onClick={() => handleStateClick('Meghalaya')}
                        />
                        <text x="780" y="280" textAnchor="middle" className="text-xs font-semibold pointer-events-none">ML</text>

                        {/* Manipur */}
                        <path
                            d="M810 285 L835 280 L845 305 L825 315 L815 310 Z"
                            fill="#FF69B4"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-hot-pink-300 transition-colors duration-200"
                            onClick={() => handleStateClick('Manipur')}
                        />
                        <text x="825" y="300" textAnchor="middle" className="text-xs font-semibold pointer-events-none">MN</text>

                        {/* Tripura */}
                        <path
                            d="M785 295 L810 290 L820 315 L800 325 L790 320 Z"
                            fill="#BA55D3"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-purple-400 transition-colors duration-200"
                            onClick={() => handleStateClick('Tripura')}
                        />
                        <text x="800" y="310" textAnchor="middle" className="text-xs font-semibold pointer-events-none">TR</text>

                        {/* Nagaland */}
                        <path
                            d="M820 250 L850 245 L860 270 L840 280 L825 275 Z"
                            fill="#FF6347"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-red-400 transition-colors duration-200"
                            onClick={() => handleStateClick('Nagaland')}
                        />
                        <text x="840" y="265" textAnchor="middle" className="text-xs font-semibold pointer-events-none">NL</text>

                        {/* Mizoram */}
                        <path
                            d="M825 315 L845 310 L855 335 L835 345 L830 340 Z"
                            fill="#7FFF00"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-green-400 transition-colors duration-200"
                            onClick={() => handleStateClick('Mizoram')}
                        />
                        <text x="840" y="330" textAnchor="middle" className="text-xs font-semibold pointer-events-none">MZ</text>

                        {/* Arunachal Pradesh */}
                        <path
                            d="M820 180 L880 175 L900 210 L870 225 L840 220 Z"
                            fill="#8A2BE2"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-purple-500 transition-colors duration-200"
                            onClick={() => handleStateClick('Arunachal Pradesh')}
                        />
                        <text x="860" y="205" textAnchor="middle" className="text-xs font-semibold pointer-events-none">AR</text>

                        {/* Sikkim */}
                        <path
                            d="M680 200 L710 195 L720 220 L700 230 L685 225 Z"
                            fill="#FF8C00"
                            stroke="#333"
                            strokeWidth="1.5"
                            className="cursor-pointer hover:fill-orange-400 transition-colors duration-200"
                            onClick={() => handleStateClick('Sikkim')}
                        />
                        <text x="700" y="215" textAnchor="middle" className="text-xs font-semibold pointer-events-none">SK</text>
                    </svg>
                </div>

                {/* Modal for State Information */}
                {selectedState && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto">
                            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-b px-4 py-3 flex justify-between items-center rounded-t-xl">
                                <h2 className="text-2xl font-bold">{selectedState.name}</h2>
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-4 space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                                        <h3 className="font-bold text-lg text-blue-800 mb-2 flex items-center">
                                            🏛️ संस्कृति
                                        </h3>
                                        <p className="text-gray-700 text-sm leading-relaxed">{selectedState.culture}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg shadow-md border-l-4 border-purple-500">
                                        <h3 className="font-bold text-lg text-purple-800 mb-2 flex items-center">
                                            🎨 कला
                                        </h3>
                                        <p className="text-gray-700 text-sm leading-relaxed">{selectedState.art}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg shadow-md border-l-4 border-green-500">
                                        <h3 className="font-bold text-lg text-green-800 mb-2 flex items-center">
                                            💃 लोक कला
                                        </h3>
                                        <p className="text-gray-700 text-sm leading-relaxed">{selectedState.folk}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg shadow-md border-l-4 border-orange-500">
                                        <h3 className="font-bold text-lg text-orange-800 mb-2 flex items-center">
                                            ⭐ प्रसिद्ध
                                        </h3>
                                        <p className="text-gray-700 text-sm leading-relaxed">{selectedState.famous}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg shadow-md border-l-4 border-pink-500">
                                        <h3 className="font-bold text-lg text-pink-800 mb-2 flex items-center">
                                            🎉 त्योहार
                                        </h3>
                                        <p className="text-gray-700 text-sm leading-relaxed">{selectedState.festivals}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
                                        <h3 className="font-bold text-lg text-yellow-800 mb-2 flex items-center">
                                            🍛 खाना
                                        </h3>
                                        <p className="text-gray-700 text-sm leading-relaxed">{selectedState.food}</p>
                                    </div>
                                </div>

                                <div className="text-center pt-3">
                                    <button
                                        onClick={closeModal}
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg text-sm"
                                    >
                                        बंद करें
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InteractiveIndiaMap;