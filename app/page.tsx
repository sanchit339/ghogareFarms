'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { SITE, WA, translations, type Lang } from '@/lib/config'

// ──────────────────────────────────────────────────────────
// ICONS (inline SVG to avoid dependencies)
// ──────────────────────────────────────────────────────────
const IconWA    = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
const IconStar  = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-400"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
const IconCheck = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4"><polyline points="20 6 9 17 4 12"/></svg>
const IconInsta = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
const IconArrow = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4"><polyline points="9 18 15 12 9 6"/></svg>
const IconPlus  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>

// ──────────────────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────────────────
const puneareas = [
  { name: 'Baner',           wa: 'baner' },
  { name: 'Wakad',           wa: 'wakad' },
  { name: 'Hinjewadi',       wa: 'hinjewadi' },
  { name: 'Kothrud',         wa: 'generic' },
  { name: 'Viman Nagar',     wa: 'generic' },
  { name: 'Koregaon Park',   wa: 'generic' },
  { name: 'Aundh',           wa: 'generic' },
  { name: 'Pimple Saudagar', wa: 'generic' },
  { name: 'Shivajinagar',    wa: 'generic' },
  { name: 'Hadapsar',        wa: 'generic' },
  { name: 'Magarpatta',      wa: 'generic' },
  { name: 'Bavdhan',         wa: 'generic' },
  { name: 'Pashan',          wa: 'generic' },
  { name: 'Sus Road',        wa: 'generic' },
  { name: 'Pimple Nilakh',   wa: 'generic' },
  { name: 'Bopodi',          wa: 'generic' },
]

const faqsByLang: Record<Lang, { q: string; a: string }[]> = {
  en: [
    { q: 'What is Shivneri Hapus mango?', a: 'Shivneri Hapus is a GI tagged Alphonso mango grown exclusively in Junnar taluka, Pune district — the birthplace of Chhatrapati Shivaji Maharaj. It received its GI certification from the Government of India in December 2024. Known for its unique floral aroma, saffron-yellow color, and natural sweetness.' },
    { q: 'Do you deliver to Baner, Wakad, and Hinjewadi?', a: 'Yes! We deliver to all Pune areas including Baner, Wakad, Hinjewadi, Kothrud, Viman Nagar, Koregaon Park, Aundh, Pimple Saudagar, Hadapsar, Magarpatta and everywhere else in Pune. Delivery takes 2–3 working days.' },
    { q: 'Are your mangoes carbide-free?', a: '100% yes. We ripen our mangoes the traditional way — in hay stacks. Absolutely no calcium carbide or artificial ripening agents. Safe for children, elderly, and pregnant women.' },
    { q: 'How do I place an order?', a: 'Tap any "Order on WhatsApp" button. Tell us your Pune locality, box size (1 or 2 dozen), and quantity. We confirm within minutes. Pay via UPI, WhatsApp Pay, or Cash on Delivery.' },
    { q: 'Do you offer bulk or corporate gifting orders?', a: 'Yes! We handle bulk orders for IT companies, housing societies, weddings, and festive gifting. Custom branded boxes available. Contact us on WhatsApp for bulk pricing.' },
    { q: 'When is the Shivneri Hapus season?', a: 'Shivneri Hapus from Junnar typically comes after the Konkan season — usually May to July. This is actually a huge advantage: when Ratnagiri/Devgad stock runs out, you can still get fresh Junnar Hapus. Join our WhatsApp group to get instant stock alerts.' },
  ],
  hi: [
    { q: 'शिवनेरी हापूस आम क्या है?', a: 'शिवनेरी हापूस एक GI टैग वाला अल्फांसो आम है, जो सिर्फ पुणे जिले के जुन्नर तालुका में उगता है। यह क्षेत्र छत्रपति शिवाजी महाराज की जन्मभूमि है। इसे दिसंबर 2024 में भारत सरकार से GI प्रमाणन मिला। इसकी खास पहचान है सुगंध, केसरिया रंग और प्राकृतिक मिठास।' },
    { q: 'क्या आप बाणेर, वाकड और हिंजेवाड़ी में डिलीवरी करते हैं?', a: 'हाँ। हम बाणेर, वाकड, हिंजेवाड़ी, कोथरूड, विमान नगर, कोरेगांव पार्क, औंध, पिंपले सौदागर, हडपसर, मगरपट्टा सहित पूरे पुणे में डिलीवरी करते हैं। डिलीवरी आमतौर पर 2–3 कार्यदिवस में हो जाती है।' },
    { q: 'क्या आपके आम कार्बाइड मुक्त हैं?', a: '100% हाँ। हम आमों को पारंपरिक तरीके से पुआल में पकाते हैं। कैल्शियम कार्बाइड या कृत्रिम पकाने वाले किसी भी रसायन का उपयोग नहीं करते। बच्चों, बुजुर्गों और गर्भवती महिलाओं के लिए सुरक्षित।' },
    { q: 'ऑर्डर कैसे करें?', a: 'किसी भी "WhatsApp पर ऑर्डर करें" बटन पर टैप करें। अपनी पुणे लोकेलिटी, बॉक्स साइज (1 या 2 दर्जन) और मात्रा बताएं। हम मिनटों में कन्फर्म करते हैं। भुगतान UPI, WhatsApp Pay या Cash on Delivery से कर सकते हैं।' },
    { q: 'क्या आप बल्क या कॉर्पोरेट गिफ्टिंग ऑर्डर लेते हैं?', a: 'हाँ। हम IT कंपनियों, हाउसिंग सोसायटी, शादी और फेस्टिव गिफ्टिंग के लिए बल्क ऑर्डर लेते हैं। कस्टम ब्रांडेड बॉक्स भी उपलब्ध हैं। बल्क प्राइसिंग के लिए WhatsApp पर संपर्क करें।' },
    { q: 'शिवनेरी हापूस का सीजन कब होता है?', a: 'जुन्नर का शिवनेरी हापूस आमतौर पर कोंकण सीजन के बाद आता है, यानी मई से जुलाई के बीच। यही इसकी बड़ी खासियत है: जब रत्नागिरी/देवगड स्टॉक खत्म हो जाता है, तब भी ताज़ा जुन्नर हापूस मिल सकता है। स्टॉक अलर्ट के लिए हमारा WhatsApp ग्रुप जॉइन करें।' },
  ],
  mr: [
    { q: 'शिवनेरी हापूस आंबा म्हणजे काय?', a: 'शिवनेरी हापूस हा GI मानांकन मिळालेला अल्फोन्सो आंबा आहे, जो फक्त पुणे जिल्ह्यातील जुन्नर तालुक्यात पिकतो. ही छत्रपती शिवाजी महाराजांची जन्मभूमी आहे. डिसेंबर 2024 मध्ये भारत सरकारकडून GI प्रमाणन मिळाले. याची खासियत म्हणजे सुगंध, केशरी रंग आणि नैसर्गिक गोडवा.' },
    { q: 'बाणेर, वाकड आणि हिंजेवाडी येथे डिलिव्हरी करता का?', a: 'होय. आम्ही बाणेर, वाकड, हिंजेवाडी, कोथरूड, विमान नगर, कोरेगाव पार्क, औंध, पिंपळे सौदागर, हडपसर, मगरपट्टा आणि संपूर्ण पुण्यात डिलिव्हरी करतो. डिलिव्हरी साधारण 2–3 कामकाजाच्या दिवसांत होते.' },
    { q: 'तुमचे आंबे कार्बाइडमुक्त आहेत का?', a: '100% होय. आम्ही आंबे पारंपरिक पद्धतीने गवतामध्ये पिकवतो. कॅल्शियम कार्बाइड किंवा कृत्रिम रसायनांचा अजिबात वापर करत नाही. मुले, ज्येष्ठ आणि गर्भवती महिलांसाठी सुरक्षित.' },
    { q: 'ऑर्डर कशी करायची?', a: 'कोणतेही "WhatsApp वर ऑर्डर करा" बटण दाबा. तुमचा पुणे परिसर, बॉक्स साइज (1 किंवा 2 डझन) आणि प्रमाण सांगा. आम्ही काही मिनिटांत कन्फर्म करतो. पेमेंट UPI, WhatsApp Pay किंवा Cash on Delivery ने करू शकता.' },
    { q: 'बल्क किंवा कॉर्पोरेट गिफ्टिंग ऑर्डर घेता का?', a: 'होय. आम्ही IT कंपन्या, हाउसिंग सोसायटी, लग्न समारंभ आणि फेस्टिव गिफ्टिंगसाठी बल्क ऑर्डर घेतो. कस्टम ब्रँडेड बॉक्स उपलब्ध आहेत. बल्क प्राइससाठी WhatsApp वर संपर्क करा.' },
    { q: 'शिवनेरी हापूसचा हंगाम कधी असतो?', a: 'जुन्नरचा शिवनेरी हापूस साधारण कोकण हंगामानंतर येतो, म्हणजे मे ते जुलै दरम्यान. हीच त्याची मोठी जमेची बाजू आहे: रत्नागिरी/देवगड स्टॉक संपल्यानंतरही ताजा जुन्नर हापूस मिळू शकतो. स्टॉक अपडेटसाठी आमच्या WhatsApp ग्रुपमध्ये सामील व्हा.' },
  ],
}

const pageTextByLang: Record<Lang, {
  headerSub: string
  heroSocialProof: string
  reviewsMeta: string
  box1Features: string[]
  box2Features: string[]
  box2Save: string
  bulkTags: string[]
  giBadge: string
  giTitle: string
  giDesc: string
  giPills: string[]
  areasSeo: string
  waGroupTags: string[]
  finalTitle: string
  finalSub: string
  footerAddress: string
  footerWhatsapp: string
  footerSeo: string[]
}> = {
  en: {
    headerSub: 'Junnar · GI Tagged',
    heroSocialProof: '127+ happy Pune families this season ⭐⭐⭐⭐⭐',
    reviewsMeta: '⭐⭐⭐⭐⭐ 4.9/5 from 127+ orders',
    box1Features: ['GI Tagged Shivneri Hapus', 'Naturally ripened in hay', 'No carbide, no chemicals', 'Free delivery in Pune'],
    box2Features: ['Best value for families', 'Great for gifting & sharing', 'Same day WhatsApp confirmation', 'Pay after delivery (COD)'],
    box2Save: 'SAVE ₹XX',
    bulkTags: ['🏢 IT Offices', '🏠 Societies', '💍 Weddings', '🎁 Gifts'],
    giBadge: 'December 2024 — Government of India',
    giTitle: "Pune's Only GI Tagged Junnar Hapus",
    giDesc: "In December 2024, the Government of India granted the prestigious Geographical Indication (GI) tag to Shivneri Hapus from Junnar — the birthplace of Chhatrapati Shivaji Maharaj. This makes Junnar Hapus legally certified and one of Maharashtra's most exclusive mango varieties. Ghogare Farms grows these GI certified mangoes and delivers them directly to Pune.",
    giPills: ['🇮🇳 Govt. of India Certified', '📍 Junnar, Pune District', '🌿 No Chemicals Ever', '🚫 No Middlemen'],
    areasSeo: 'Delivering GI Tagged Shivneri Hapus Alphonso mangoes to Baner, Wakad, Hinjewadi, Kothrud, Viman Nagar, Koregaon Park, Aundh, Pimple Saudagar, Hadapsar, Magarpatta, Bavdhan, Pashan and all of Pune, Maharashtra.',
    waGroupTags: ['📦 Stock alerts', '💰 Early-bird prices', '🏡 Harvest updates'],
    finalTitle: 'Season is Live. Stock is Limited.',
    finalSub: "Shivneri Hapus sells out fast every year. Don't miss the freshest Pune-delivered mangoes.",
    footerAddress: '📍 Junnar Taluka, Pune District, Maharashtra',
    footerWhatsapp: '💬 WhatsApp Us',
    footerSeo: ['Shivneri Hapus Mangoes Pune', 'Junnar GI Tagged Alphonso', 'Carbide Free Mango Delivery', 'Baner · Wakad · Hinjewadi'],
  },
  hi: {
    headerSub: 'जुन्नर · GI टैग',
    heroSocialProof: 'इस सीज़न में पुणे के 127+ खुश परिवार ⭐⭐⭐⭐⭐',
    reviewsMeta: '⭐⭐⭐⭐⭐ 127+ ऑर्डर से 4.9/5',
    box1Features: ['GI टैग शिवनेरी हापूस', 'पुआल में प्राकृतिक पकाई', 'बिना कार्बाइड, बिना केमिकल', 'पुणे में फ्री डिलीवरी'],
    box2Features: ['परिवार के लिए बेहतरीन वैल्यू', 'गिफ्टिंग और शेयरिंग के लिए बढ़िया', 'उसी दिन WhatsApp कन्फर्मेशन', 'डिलीवरी के बाद पेमेंट (COD)'],
    box2Save: '₹XX बचत',
    bulkTags: ['🏢 IT ऑफिस', '🏠 सोसायटी', '💍 शादियां', '🎁 गिफ्ट्स'],
    giBadge: 'दिसंबर 2024 — भारत सरकार',
    giTitle: 'पुणे का एकमात्र GI टैग जुन्नर हापूस',
    giDesc: 'दिसंबर 2024 में भारत सरकार ने जुन्नर के शिवनेरी हापूस को प्रतिष्ठित Geographical Indication (GI) टैग दिया। जुन्नर छत्रपति शिवाजी महाराज की जन्मभूमि है। इससे जुन्नर हापूस कानूनी रूप से प्रमाणित हुआ और महाराष्ट्र की सबसे खास आम किस्मों में शामिल हुआ। घोगरे फार्म्स यही GI प्रमाणित आम सीधे पुणे तक पहुंचाता है।',
    giPills: ['🇮🇳 भारत सरकार प्रमाणित', '📍 जुन्नर, पुणे जिला', '🌿 बिना रसायन', '🚫 कोई बिचौलिया नहीं'],
    areasSeo: 'GI टैग वाले शिवनेरी हापूस अल्फांसो आम की डिलीवरी बाणेर, वाकड, हिंजेवाड़ी, कोथरूड, विमान नगर, कोरेगांव पार्क, औंध, पिंपले सौदागर, हडपसर, मगरपट्टा, बावधन, पाषाण और पूरे पुणे, महाराष्ट्र में उपलब्ध है।',
    waGroupTags: ['📦 स्टॉक अलर्ट', '💰 शुरुआती ऑफर', '🏡 हार्वेस्ट अपडेट'],
    finalTitle: 'सीज़न चालू है। स्टॉक सीमित है।',
    finalSub: 'हर साल शिवनेरी हापूस जल्दी खत्म हो जाता है। पुणे डिलीवरी वाले ताजे आम मिस न करें।',
    footerAddress: '📍 जुन्नर तालुका, पुणे जिला, महाराष्ट्र',
    footerWhatsapp: '💬 WhatsApp करें',
    footerSeo: ['शिवनेरी हापूस आम पुणे', 'जुन्नर GI टैग अल्फांसो', 'कार्बाइड मुक्त आम डिलीवरी', 'बाणेर · वाकड · हिंजेवाड़ी'],
  },
  mr: {
    headerSub: 'जुन्नर · GI मानांकन',
    heroSocialProof: 'या हंगामात पुण्यातील 127+ आनंदी कुटुंबे ⭐⭐⭐⭐⭐',
    reviewsMeta: '⭐⭐⭐⭐⭐ 127+ ऑर्डरमधून 4.9/5',
    box1Features: ['GI मानांकन शिवनेरी हापूस', 'गवतात नैसर्गिक पिकवलेले', 'कार्बाइड नाही, केमिकल नाही', 'पुण्यात मोफत डिलिव्हरी'],
    box2Features: ['कुटुंबासाठी सर्वोत्तम मूल्य', 'गिफ्टिंग आणि शेअरिंगसाठी उत्तम', 'त्याच दिवशी WhatsApp पुष्टी', 'डिलिव्हरीनंतर पेमेंट (COD)'],
    box2Save: '₹XX बचत',
    bulkTags: ['🏢 IT ऑफिसेस', '🏠 सोसायट्या', '💍 लग्नसमारंभ', '🎁 भेटवस्तू'],
    giBadge: 'डिसेंबर 2024 — भारत सरकार',
    giTitle: 'पुण्यातील एकमेव GI मानांकन जुन्नर हापूस',
    giDesc: 'डिसेंबर 2024 मध्ये भारत सरकारने जुन्नरच्या शिवनेरी हापूसला प्रतिष्ठित Geographical Indication (GI) मानांकन दिले. जुन्नर ही छत्रपती शिवाजी महाराजांची जन्मभूमी आहे. यामुळे जुन्नर हापूसला कायदेशीर प्रमाणन मिळाले आणि तो महाराष्ट्रातील सर्वात खास आंबा प्रकारांपैकी एक ठरला. घोगरे फार्म्स हे GI प्रमाणित आंबे थेट पुण्यात पोहोचवते.',
    giPills: ['🇮🇳 भारत सरकार प्रमाणित', '📍 जुन्नर, पुणे जिल्हा', '🌿 रसायनमुक्त', '🚫 मध्यस्थ नाहीत'],
    areasSeo: 'GI मानांकन असलेले शिवनेरी हापूस अल्फोन्सो आंबे बाणेर, वाकड, हिंजेवाडी, कोथरूड, विमान नगर, कोरेगाव पार्क, औंध, पिंपळे सौदागर, हडपसर, मगरपट्टा, बावधन, पाषाण आणि संपूर्ण पुणे, महाराष्ट्र येथे डिलिव्हर केले जातात.',
    waGroupTags: ['📦 स्टॉक अलर्ट', '💰 अर्ली-बर्ड किंमत', '🏡 हार्वेस्ट अपडेट्स'],
    finalTitle: 'हंगाम सुरू आहे. साठा मर्यादित आहे.',
    finalSub: 'दरवर्षी शिवनेरी हापूस लवकर संपतो. पुणे डिलिव्हरीतील ताजे आंबे चुकवू नका.',
    footerAddress: '📍 जुन्नर तालुका, पुणे जिल्हा, महाराष्ट्र',
    footerWhatsapp: '💬 WhatsApp वर संपर्क',
    footerSeo: ['शिवनेरी हापूस आंबे पुणे', 'जुन्नर GI मानांकन अल्फोन्सो', 'कार्बाइडमुक्त आंबा डिलिव्हरी', 'बाणेर · वाकड · हिंजेवाडी'],
  },
}

// ──────────────────────────────────────────────────────────
// COMPONENT
// ──────────────────────────────────────────────────────────
export default function HomePage() {
  const [lang, setLang] = useState<Lang>('en')
  const t = translations[lang]
  const faqs = faqsByLang[lang]
  const ui = pageTextByLang[lang]

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view') }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // FB Pixel event helper
  const fbEvent = (event: string, params?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', event, params)
    }
  }

  const handleWAClick = (type: keyof typeof WA, label: string) => {
    fbEvent('Contact', { content_name: label, method: 'WhatsApp' })
    fbEvent('Lead', { content_name: label })
  }

  const waLink = (type: keyof typeof WA) => WA[type](SITE.whatsapp)

  return (
    <main
      style={{
        maxWidth: 430,
        margin: '0 auto',
        minHeight: '100dvh',
        background: 'var(--background-light)',
        position: 'relative',
        boxShadow: '0 0 0 1px rgba(244,171,37,0.12), 0 10px 40px rgba(0,0,0,0.08)',
      }}
    >
      {/* ══════════════════════════════════════════════════
          LANGUAGE SELECTOR
      ══════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(255,248,232,0.72)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1.5px solid rgba(244,171,37,0.35)',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>🥭</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--earth)', lineHeight: 1, fontFamily: 'var(--font-playfair)' }}>Ghogare Farms</p>
            <p style={{ fontSize: 9, color: 'var(--amber)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{ui.headerSub}</p>
          </div>
        </div>
        {/* Lang buttons */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {(['en', 'hi', 'mr'] as Lang[]).map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`lang-btn font-deva ${lang === l ? 'active' : ''}`}
              aria-label={`${t.lang_label}: ${(t as any)[`lang_${l}`]}`}
            >
              {l === 'en' ? 'English' : l === 'hi' ? 'हिंदी' : 'मराठी'}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <header
        className="relative flex flex-col justify-end"
        style={{
          minHeight: 'calc(100dvh - 84px)',
          background: `
            linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%),
            url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFoLxysWDktHUiRoVeAnWAiaIJurXGoEwKkgyhYx6Wb1dUddlVdri2JJjLdopHJkPp4mcUzEnmIBEQfsg8vwdwZu56DYQu9cMhd2SsdRNxTvGoopuYiXJiYkZ1mys4tdcsjxXdr3dHw7zX_f3r8y0SQYLnpCzzqD8rIdAkBI2rO46swBZRf8Mek5SkW3gAT6mZmQ0efsF1MXyz24HxsWkZJMnrvZHhyTBW-__GWR2aIjwmPJ84er5qV0TV_nk0WDCfgXHliqii_OE') center/cover no-repeat
          `,
        }}
      >
        <div className="max-w-xl px-6 space-y-4" style={{ paddingBottom: 'calc(110px + env(safe-area-inset-bottom, 0px))' }}>
          {/* GI Badge */}
          <div className="gi-badge animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <IconCheck />{t.gi_badge}
          </div>

          {/* Title */}
          <h1
            className="font-display text-white animate-fade-up"
            style={{ fontSize: 'clamp(2.25rem, 6vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', animationDelay: '0.2s' }}
          >
            {t.hero_title}
          </h1>

          {/* Sub */}
          <p
            className="text-amber-100 font-medium animate-fade-up"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', lineHeight: 1.6, animationDelay: '0.35s', opacity: 0 }}
          >
            {t.hero_sub}
          </p>

          {/* Social proof mini */}
          <div className="flex items-center gap-3 animate-fade-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
            <div className="flex -space-x-1">
              {['🙋', '🙋‍♀️', '🙋‍♂️', '🙋'].map((e, i) => (
                <span key={i} style={{ fontSize: 20, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>{e}</span>
              ))}
            </div>
            <p style={{ color: '#FFE4B0', fontSize: 13, fontWeight: 600 }}>
              {ui.heroSocialProof}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 pt-1 animate-fade-up" style={{ animationDelay: '0.65s', opacity: 0 }}>
            <a
              href={waLink('generic')}
              onClick={() => handleWAClick('generic', 'Hero CTA')}
              className="btn-wa text-lg"
              style={{ flex: 1 }}
              aria-label={`${t.hero_cta} - WhatsApp`}
            >
              <IconWA />{t.hero_cta}
            </a>
            <a
              href={SITE.waGroupLink}
              onClick={() => fbEvent('Subscribe', { content_name: 'WA Group' })}
              className="btn-amber"
              style={{ flex: 1, borderRadius: '9999px' }}
            >
              🔔 {t.hero_group}
            </a>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════
          TRUST BAR
      ══════════════════════════════════════════════════ */}
      <div style={{ background: 'rgba(244,171,37,0.1)', borderTop: '1px solid rgba(244,171,37,0.2)', borderBottom: '1px solid rgba(244,171,37,0.2)', padding: '14px 16px', overflowX: 'auto' }}>
        <div className="hide-scrollbar flex gap-5 items-center justify-start md:justify-center whitespace-nowrap" style={{ minWidth: 'max-content', margin: '0 auto' }}>
          {[
            { icon: '🌿', key: 'trust1' }, { icon: '🚚', key: 'trust2' }, { icon: '🏆', key: 'trust3' },
            { icon: '🌾', key: 'trust4' }, { icon: '✅', key: 'trust5' },
          ].map((item, i) => (
            <span key={i} className="trust-item" style={{ color: '#334155', fontSize: 12 }}>
              {i > 0 && <span className="trust-dot" style={{ background: 'rgba(244,171,37,0.35)' }} />}
              <span>{item.icon}</span>
              <span className="font-deva">{(t as any)[item.key]}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          REVIEWS — 5 STAR
      ══════════════════════════════════════════════════ */}
      <section className="section" id="reviews">
        <div className="max-w-screen-lg mx-auto">
          <div style={{ textAlign: 'center', marginBottom: 40 }} data-animate>
            <h2 className="section-title font-deva">{t.why_title}</h2>
            <div className="divider" />
            <p style={{ marginTop: 10, color: '#8B7355', fontSize: 13 }}>{ui.reviewsMeta}</p>
          </div>
          <div className="hide-scrollbar" style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 12, scrollSnapType: 'x mandatory' }}>
            {[
              { textKey: 'r1', nameKey: 'r1_name', placeKey: 'r1_place', emoji: '🙋‍♂️' },
              { textKey: 'r2', nameKey: 'r2_name', placeKey: 'r2_place', emoji: '🙋‍♀️' },
              { textKey: 'r3', nameKey: 'r3_name', placeKey: 'r3_place', emoji: '🙋‍♂️' },
              { textKey: 'r4', nameKey: 'r4_name', placeKey: 'r4_place', emoji: '🙋‍♀️' },
              { textKey: 'r5', nameKey: 'r5_name', placeKey: 'r5_place', emoji: '🙋‍♂️' },
            ].map((rev, i) => (
              <div
                key={i}
                style={{
                  minWidth: 290, maxWidth: 320, scrollSnapAlign: 'center',
                  background: '#fff', borderRadius: 20, padding: 24,
                  border: '1.5px solid rgba(244,171,37,0.12)',
                  boxShadow: '0 4px 20px rgba(92,61,30,0.07)',
                  flex: '0 0 290px',
                }}
                data-animate
              >
                <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                  {[...Array(5)].map((_, j) => <IconStar key={j} />)}
                </div>
                <p className="font-deva" style={{ fontSize: 14, color: 'var(--earth)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 16 }}>
                  {(t as any)[rev.textKey]}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{rev.emoji}</span>
                  <div>
                    <p className="font-deva" style={{ fontSize: 14, fontWeight: 700, color: 'var(--earth)' }}>{(t as any)[rev.nameKey]}</p>
                    <p className="font-deva" style={{ fontSize: 12, color: '#8B7355' }}>{(t as any)[rev.placeKey]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PRODUCTS — 3 BOXES
      ══════════════════════════════════════════════════ */}
      <section
        id="products"
        className="section"
        style={{ background: 'linear-gradient(180deg, rgba(244,171,37,0.1) 0%, #F8F7F5 100%)' }}
      >
        <div className="max-w-md mx-auto space-y-6">
          <div style={{ textAlign: 'center', marginBottom: 32 }} data-animate>
            <h2 className="section-title font-deva">{t.product_title}</h2>
            <div className="divider" />
            <p className="font-deva" style={{ marginTop: 12, color: '#6B5240', fontSize: 14 }}>{t.product_sub}</p>
          </div>

          {/* Box 1 — 1 Dozen */}
          <div className="card relative" data-animate>
            <div className="ribbon">{t.box1_badge}</div>
            <div style={{
              height: 200, overflow: 'hidden',
              background: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3KzgjUmhxsc3aVs3Rz7XfR796atZejhWPtdzNxSfpaMLU2rBlmaWntdfMwhLrdKnDaKbC_w6PgGgaRRiCBMDbYZ-zXcNqb9x3flGvXIEOR8GwDvHpbZbF_BVkPiNhRiCTcz05FDMPZORKijZXXkc_2b4UEru6em5xAj2oBVDHiiubM1NAUCCsKuAIkECiqunHqul5CNuMSrwkFs3F3SZ6GLiLepX11FNSjCpRLk3H9OwEb_e4mD9xgZ0c-3PdwOM5Vie472jd9gc') center/cover no-repeat`,
            }} />
            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <h3 className="font-display font-deva" style={{ fontSize: 20, fontWeight: 800, color: 'var(--earth)' }}>{t.box1_name}</h3>
                  <p className="font-deva" style={{ fontSize: 13, color: '#8B7355', marginTop: 4 }}>{t.box1_weight}</p>
                </div>
                <div>
                  <p className="font-display" style={{ fontSize: 26, fontWeight: 900, color: 'var(--amber)' }}>{t.box1_price}</p>
                </div>
              </div>
              <ul style={{ margin: '12px 0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {ui.box1Features.map(item => (
                  <li key={item} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'var(--forest)' }}>
                    <IconCheck /><span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={waLink('dozen1')}
                onClick={() => handleWAClick('dozen1', '1 Dozen Box')}
                className="btn-wa"
                style={{ width: '100%', marginTop: 16, borderRadius: 12 }}
                aria-label={`${t.order_wa} - ${t.box1_name}`}
              >
                <IconWA />{t.order_wa}
              </a>
            </div>
          </div>

          {/* Box 2 — 2 Dozen */}
          <div className="card relative" data-animate>
            <div className="ribbon" style={{ background: 'var(--forest)', color: '#fff' }}>{t.box2_badge}</div>
            <div style={{
              height: 200, overflow: 'hidden',
              background: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAeB5vJsWiMu3BmgQQ3Alzio5aQb00VL4NBMZWoDbhuxgaAwXFdBbf1JzNXh8qMznzGWToTBbQd9kNnJ7DvzD_VfZSjpl2l0U0YvdYCQG4mHIXg_IaR9Cd-h7k3wZvkM2ibh5jmwfkjKT9x0Jl3gPYErYJVVhG-CZnogpSrau4DgbDmiNdyQNltaPZjhXlQMRyb9t233jVdrz5aNCboIL0oZ8xJM4AO6XvmzzJ7F1ubVmQq157u-oarL3JaMaHoJmKfxFl9gEgOjQg') center/cover no-repeat`,
            }} />
            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <h3 className="font-display font-deva" style={{ fontSize: 20, fontWeight: 800, color: 'var(--earth)' }}>{t.box2_name}</h3>
                  <p className="font-deva" style={{ fontSize: 13, color: '#8B7355', marginTop: 4 }}>{t.box2_weight}</p>
                </div>
                <div>
                  <p className="font-display" style={{ fontSize: 26, fontWeight: 900, color: 'var(--amber)' }}>{t.box2_price}</p>
                  <p style={{ fontSize: 10, color: 'var(--forest)', fontWeight: 700, textAlign: 'right' }}>{ui.box2Save}</p>
                </div>
              </div>
              <ul style={{ margin: '12px 0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {ui.box2Features.map(item => (
                  <li key={item} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'var(--forest)' }}>
                    <IconCheck /><span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={waLink('dozen2')}
                onClick={() => handleWAClick('dozen2', '2 Dozen Box')}
                className="btn-wa"
                style={{ width: '100%', marginTop: 16, borderRadius: 12 }}
                aria-label={`${t.order_wa} - ${t.box2_name}`}
              >
                <IconWA />{t.order_wa}
              </a>
            </div>
          </div>

          {/* Box 3 — Bulk */}
          <div
            className="card relative"
            data-animate
            style={{ background: 'linear-gradient(135deg, var(--earth) 0%, var(--forest) 100%)', color: '#fff' }}
          >
            <div className="ribbon" style={{ background: 'var(--saffron)', color: 'var(--bark)' }}>{t.box3_badge}</div>
            <div style={{ padding: 28 }}>
              <div style={{ fontSize: 42, marginBottom: 12 }}>📦</div>
              <h3 className="font-display font-deva" style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{t.box3_name}</h3>
              <p className="font-deva" style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 20 }}>{t.box3_desc}</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
                {ui.bulkTags.map(tag => (
                  <span key={tag} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>{tag}</span>
                ))}
              </div>
              <a
                href={waLink('bulk')}
                onClick={() => handleWAClick('bulk', 'Bulk Order')}
                className="btn-wa"
                style={{ width: '100%', borderRadius: 12, background: 'var(--whatsapp)' }}
                aria-label={`${t.enquire_wa} - ${t.box3_name}`}
              >
                <IconWA />{t.enquire_wa}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHY US — 4 CARDS
      ══════════════════════════════════════════════════ */}
      <section className="section" id="why">
        <div className="max-w-screen-lg mx-auto">
          <div style={{ textAlign: 'center', marginBottom: 48 }} data-animate>
            <h2 className="section-title font-deva">{t.reviews_title}</h2>
            <div className="divider" />
          </div>
          <div className="hide-scrollbar" style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 12, scrollSnapType: 'x mandatory' }}>
            {[
              { icon: '🏆', titleKey: 'card1_title', descKey: 'card1_desc', color: 'var(--forest)' },
              { icon: '🌾', titleKey: 'card2_title', descKey: 'card2_desc', color: 'var(--amber)' },
              { icon: '🚚', titleKey: 'card3_title', descKey: 'card3_desc', color: '#2563EB' },
              { icon: '🌿', titleKey: 'card4_title', descKey: 'card4_desc', color: '#059669' },
            ].map((card, i) => (
              <div
                key={i}
                className="card"
                data-animate
                style={{
                  minWidth: 270, scrollSnapAlign: 'center', padding: 28, flex: '0 0 270px'
                }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${card.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 18 }}>
                  {card.icon}
                </div>
                <h3 className="font-deva" style={{ fontSize: 16, fontWeight: 700, color: 'var(--earth)', marginBottom: 8 }}>
                  {(t as any)[card.titleKey]}
                </h3>
                <p className="font-deva" style={{ fontSize: 14, color: '#6B5240', lineHeight: 1.6 }}>
                  {(t as any)[card.descKey]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          GI TAG SPOTLIGHT — UNIQUE COMPETITOR ADVANTAGE
      ══════════════════════════════════════════════════ */}
      <section className="section-sm" style={{ background: 'linear-gradient(135deg, #FFF8E8 0%, #F8F7F5 60%)' }}>
        <div className="max-w-3xl mx-auto" data-animate>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
            <div style={{ fontSize: 56, animation: 'float 3s ease-in-out infinite' }}>🏆</div>
            <div className="gi-badge font-deva" style={{ fontSize: 11 }}>{ui.giBadge}</div>
            <h2 className="section-title font-deva">{ui.giTitle}</h2>
            <div className="divider" />
            <p className="font-deva" style={{ maxWidth: 600, color: 'var(--earth)', lineHeight: 1.8, fontSize: 16 }}>{ui.giDesc}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
              {ui.giPills.map(item => (
                <span key={item} style={{ background: '#fff', border: '1.5px solid rgba(45,80,22,0.2)', borderRadius: 9999, padding: '6px 14px', fontSize: 13, fontWeight: 600, color: 'var(--forest)' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          HOW TO ORDER — 4 STEPS
      ══════════════════════════════════════════════════ */}
      <section
        id="order"
        className="section"
        style={{ background: 'linear-gradient(180deg, #0f172a 0%, #111827 100%)' }}
      >
        <div className="max-w-md mx-auto">
          <div style={{ textAlign: 'center', marginBottom: 48 }} data-animate>
            <h2 className="font-display font-deva" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
              {t.how_title}
            </h2>
            <div className="divider" />
          </div>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Connector line */}
            <div className="step-line" />
            {[
              { num: 1, icon: '💬', titleKey: 'step1_title', descKey: 'step1_desc' },
              { num: 2, icon: '📍', titleKey: 'step2_title', descKey: 'step2_desc' },
              { num: 3, icon: '📦', titleKey: 'step3_title', descKey: 'step3_desc' },
              { num: 4, icon: '🥭', titleKey: 'step4_title', descKey: 'step4_desc' },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', position: 'relative', zIndex: 2 }} data-animate>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--amber) 0%, var(--saffron) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: 18, color: 'var(--bark)',
                  boxShadow: '0 4px 14px rgba(244,171,37,0.4)',
                }}>
                  {step.num}
                </div>
                <div style={{ paddingTop: 6 }}>
                  <h3 className="font-deva" style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                    {step.icon} {(t as any)[step.titleKey]}
                  </h3>
                  <p className="font-deva" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                    {(t as any)[step.descKey]}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48 }} data-animate>
            <a
              href={waLink('generic')}
              onClick={() => handleWAClick('generic', 'How To Order CTA')}
              className="btn-wa"
              style={{ width: '100%', fontSize: 18, padding: '1.1rem' }}
            >
              <IconWA />{t.final_cta}
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PUNE DELIVERY AREAS — LOCAL SEO GOLD
      ══════════════════════════════════════════════════ */}
      <section className="section-sm" id="areas" style={{ background: 'var(--cream-dk)' }}>
        <div className="max-w-screen-lg mx-auto">
          <div style={{ textAlign: 'center', marginBottom: 28 }} data-animate>
            <h2 className="section-title font-deva">{t.areas_title}</h2>
            <div className="divider" />
            <p className="font-deva" style={{ marginTop: 10, color: '#6B5240', fontSize: 14 }}>{t.areas_sub}</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }} data-animate>
            {puneareas.map(area => (
              <a
                key={area.name}
                href={WA[area.wa as keyof typeof WA](SITE.whatsapp)}
                onClick={() => handleWAClick(area.wa as keyof typeof WA, `Area: ${area.name}`)}
                className="area-pill font-deva"
                aria-label={
                  lang === 'en'
                    ? `Order Hapus mangoes in ${area.name}, Pune`
                    : lang === 'hi'
                      ? `पुणे के ${area.name} में हापूस आम ऑर्डर करें`
                      : `पुण्यातील ${area.name} येथे हापूस आंबे ऑर्डर करा`
                }
              >
                📍 {area.name}
              </a>
            ))}
          </div>
          {/* Hidden SEO text — visible to Google, subtle to users */}
          <p
            style={{ marginTop: 24, textAlign: 'center', fontSize: 12, color: '#A08060', maxWidth: 640, margin: '24px auto 0' }}
            className="font-deva"
          >
            {ui.areasSeo}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          INSTAGRAM + WHATSAPP GROUP
      ══════════════════════════════════════════════════ */}
      <section className="section" id="instagram">
        <div className="max-w-screen-lg mx-auto">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>

            {/* Instagram Card */}
            <div
              className="card"
              data-animate
              style={{
                background: 'linear-gradient(135deg, #833AB4 0%, #C13584 50%, #E1306C 75%, #F56040 100%)',
                color: '#fff', padding: 32, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start',
              }}
            >
              <IconInsta />
              <h3 className="font-display font-deva" style={{ fontSize: 22, fontWeight: 800 }}>{t.insta_title}</h3>
              <p className="font-deva" style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>{t.insta_sub}</p>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => fbEvent('ViewContent', { content_name: 'Instagram' })}
                className="btn-amber"
                style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(255,255,255,0.4)' }}
              >
                <IconInsta />{t.insta_cta}
              </a>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{SITE.instagramHandle}</p>
            </div>

            {/* WhatsApp Group Card */}
            <div
              className="card"
              data-animate
              style={{
                background: 'linear-gradient(135deg, #075E54 0%, #25D366 100%)',
                color: '#fff', padding: 32, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start',
              }}
            >
              <span style={{ fontSize: 36 }}>🔔</span>
              <h3 className="font-display font-deva" style={{ fontSize: 22, fontWeight: 800 }}>{t.group_title}</h3>
              <p className="font-deva" style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>{t.group_sub}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {ui.waGroupTags.map(tag => (
                  <span key={tag} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 10px', fontSize: 12 }}>{tag}</span>
                ))}
              </div>
              <a
                href={SITE.waGroupLink}
                onClick={() => fbEvent('Subscribe', { content_name: 'WA Group' })}
                className="btn-wa"
                style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(255,255,255,0.4)' }}
              >
                <IconWA />{t.group_cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FAQ — Boosts Google rich results
      ══════════════════════════════════════════════════ */}
      <section className="section" id="faq" style={{ background: 'var(--cream-dk)' }}>
        <div className="max-w-2xl mx-auto">
          <div style={{ textAlign: 'center', marginBottom: 40 }} data-animate>
            <h2 className="section-title font-deva">{t.faq_title}</h2>
            <div className="divider" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq, i) => (
              <details
                key={i}
                style={{ background: '#fff', borderRadius: 14, border: '1.5px solid rgba(244,171,37,0.15)', overflow: 'hidden' }}
                data-animate
              >
                <summary style={{ padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontWeight: 600, fontSize: 15, color: 'var(--earth)', listStyle: 'none' }}>
                  <span className="font-deva">{faq.q}</span>
                  <span className="faq-icon" style={{ flexShrink: 0, color: 'var(--amber)' }}><IconPlus /></span>
                </summary>
                <div style={{ padding: '0 20px 18px', fontSize: 14, color: '#6B5240', lineHeight: 1.7 }} className="font-deva">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════ */}
      <section
        className="section-sm"
        style={{
          background: `linear-gradient(135deg, rgba(59,42,0,0.97) 0%, rgba(45,80,22,0.97) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFoLxysWDktHUiRoVeAnWAiaIJurXGoEwKkgyhYx6Wb1dUddlVdri2JJjLdopHJkPp4mcUzEnmIBEQfsg8vwdwZu56DYQu9cMhd2SsdRNxTvGoopuYiXJiYkZ1mys4tdcsjxXdr3dHw7zX_f3r8y0SQYLnpCzzqD8rIdAkBI2rO46swBZRf8Mek5SkW3gAT6mZmQ0efsF1MXyz24HxsWkZJMnrvZHhyTBW-__GWR2aIjwmPJ84er5qV0TV_nk0WDCfgXHliqii_OE') center/cover`,
          textAlign: 'center',
          padding: '64px 20px',
        }}
        data-animate
      >
        <span style={{ fontSize: 52, display: 'block', marginBottom: 16, animation: 'float 3s ease-in-out infinite' }}>🥭</span>
        <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: '#fff', marginBottom: 12 }}>
          {ui.finalTitle}
        </h2>
        <p className="font-deva" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, marginBottom: 32 }}>
          {ui.finalSub}
        </p>
        <a
          href={waLink('generic')}
          onClick={() => handleWAClick('generic', 'Final CTA')}
          className="btn-wa"
          style={{ fontSize: 18, padding: '1.1rem 2.5rem', margin: '0 auto' }}
        >
          <IconWA />{t.final_cta}
        </a>
      </section>

      {/* ══════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════ */}
      <footer style={{ background: 'var(--bark)', color: 'rgba(255,255,255,0.75)', textAlign: 'center', padding: '3rem 1.5rem 7rem' }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 32 }}>🥭</span>
          <p className="font-display" style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginTop: 8 }}>Ghogare Farms</p>
          <p className="font-deva" style={{ fontSize: 13, marginTop: 4, color: 'var(--saffron)' }}>{t.footer_tagline}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
          <p>{ui.footerAddress}</p>
          <p>🌐 ghogarefarms.in</p>
          <a href={`tel:${SITE.phone}`} style={{ color: 'inherit' }}>📞 {SITE.phone}</a>
          <a href={waLink('generic')} style={{ color: 'var(--whatsapp)', fontWeight: 700 }}>{ui.footerWhatsapp}</a>
        </div>
        <div style={{ marginTop: 20, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', fontSize: 12 }}>
          <span>{ui.footerSeo[0]}</span>
          <span>·</span>
          <span>{ui.footerSeo[1]}</span>
          <span>·</span>
          <span>{ui.footerSeo[2]}</span>
          <span>·</span>
          <span>{ui.footerSeo[3]}</span>
        </div>
        <p style={{ marginTop: 20, fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
          © {new Date().getFullYear()} Ghogare Farms. All rights reserved.
        </p>
      </footer>

      {/* ══════════════════════════════════════════════════
          STICKY BOTTOM BAR
      ══════════════════════════════════════════════════ */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 'min(100vw, 430px)', zIndex: 200,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1.5px solid rgba(244,171,37,0.2)',
        padding: '10px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        boxShadow: '0 -4px 24px rgba(92,61,30,0.12)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
          <span style={{ fontSize: 26, flexShrink: 0 }}>🥭</span>
          <div>
            <p className="font-deva" style={{ fontSize: 11, fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1 }}>Ghogare Farms</p>
            <p className="font-deva" style={{ fontSize: 12, color: 'var(--earth)', marginTop: 2 }}>{t.sticky_sub}</p>
          </div>
        </div>
        <a
          href={waLink('generic')}
          onClick={() => handleWAClick('generic', 'Sticky Bar')}
          className="btn-wa"
          style={{ fontSize: 14, padding: '0.65rem 1.25rem', flexShrink: 0, borderRadius: '9999px' }}
        >
          <IconWA />{t.sticky_btn}
        </a>
      </div>
    </main>
  )
}
