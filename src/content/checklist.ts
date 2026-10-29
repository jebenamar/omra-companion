import type { ChecklistCategory, ChecklistItem } from "./types";

export const checklistCategories: ChecklistCategory[] = [
  "documents",
  "bookings",
  "religious",
  "luggage",
  "health",
  "phone",
  "offline",
];

const item = (id: string, category: ChecklistCategory, ar: string, fr: string, en: string, es: string): ChecklistItem => ({
  id,
  category,
  label: { ar, fr, en, es },
});

export const checklist: ChecklistItem[] = [
  item("passport", "documents", "جواز سفر ساري المفعول", "Passeport en cours de validité", "Valid passport", "Pasaporte vigente"),
  item("visa", "documents", "تأشيرة العمرة أو التأشيرة المناسبة", "Visa Omra ou visa adapté", "Umrah visa or suitable visa", "Visado de Umrah o visado adecuado"),
  item("copies", "documents", "نسخ ورقية ورقمية من الوثائق", "Copies papier et numériques des documents", "Paper and digital copies of documents", "Copias en papel y digitales de los documentos"),
  item("insurance", "documents", "وثيقة التأمين الصحي", "Attestation d'assurance santé", "Health insurance certificate", "Certificado de seguro médico"),
  item("vaccines", "documents", "شهادات التطعيم المطلوبة (تحقق من الاشتراطات الحالية)", "Certificats de vaccination exigés (vérifier les exigences actuelles)", "Required vaccination certificates (check current requirements)", "Certificados de vacunación exigidos (comprobar los requisitos vigentes)"),

  item("flights", "bookings", "تذاكر الطيران", "Billets d'avion", "Flight tickets", "Billetes de avión"),
  item("hotel", "bookings", "حجز السكن في مكة والمدينة", "Réservation d'hébergement à La Mecque et Médine", "Accommodation booked in Makkah and Madinah", "Alojamiento reservado en La Meca y Medina"),
  item("transport", "bookings", "وسيلة النقل بين المدن (قطار الحرمين، حافلة…)", "Transport entre les villes (train Haramain, bus…)", "Transport between cities (Haramain train, bus…)", "Transporte entre ciudades (tren Haramain, autobús…)"),
  item("nusuk-app", "bookings", "حساب في تطبيق نسك والتصاريح اللازمة", "Compte sur l'application Nusuk et autorisations nécessaires", "Nusuk app account and required permits", "Cuenta en la aplicación Nusuk y permisos necesarios"),

  item("learn-rites", "religious", "مراجعة خطوات العمرة في هذا الدليل", "Revoir les étapes de la Omra dans ce guide", "Review the Umrah steps in this guide", "Repasar las etapas de la Umrah en esta guía"),
  item("learn-talbiya", "religious", "حفظ التلبية", "Mémoriser la Talbiya", "Memorise the Talbiya", "Memorizar la Talbiya"),
  item("know-miqat", "religious", "معرفة الميقات حسب طريق الوصول", "Connaître son Miqat selon l'itinéraire", "Know your Miqat for your route", "Conocer tu Miqat según la ruta"),
  item("repentance", "religious", "التوبة وردّ الحقوق", "Se repentir et restituer les droits d'autrui", "Repent and return others' rights", "Arrepentirse y devolver los derechos ajenos"),

  item("ihram-clothes", "luggage", "ملابس الإحرام (للرجال: إزار ورداء)", "Vêtements d'Ihram (homme : izar et rida')", "Ihram garments (men: izar and rida')", "Ropa de Ihram (hombre: izar y rida')"),
  item("sandals", "luggage", "نعال مريحة", "Sandales confortables", "Comfortable sandals", "Sandalias cómodas"),
  item("unscented", "luggage", "منتجات نظافة غير معطّرة", "Produits d'hygiène sans parfum", "Unscented hygiene products", "Productos de higiene sin perfume"),
  item("bag", "luggage", "حقيبة صغيرة لحفظ الأحذية والأغراض", "Petit sac pour chaussures et effets", "Small bag for shoes and belongings", "Bolsa pequeña para calzado y pertenencias"),
  item("umbrella", "luggage", "مظلة للوقاية من الشمس", "Ombrelle contre le soleil", "Umbrella for sun protection", "Sombrilla contra el sol"),

  item("medication", "health", "الأدوية الشخصية مع الوصفة الطبية", "Médicaments personnels avec ordonnance", "Personal medication with prescription", "Medicamentos personales con receta"),
  item("first-aid", "health", "حقيبة إسعافات أولية (لصقات للبثور…)", "Trousse de premiers soins (pansements pour ampoules…)", "First-aid kit (blister plasters…)", "Botiquín (apósitos para ampollas…)"),
  item("hydration", "health", "قارورة ماء قابلة لإعادة التعبئة", "Gourde réutilisable", "Reusable water bottle", "Botella de agua reutilizable"),
  item("sunscreen", "health", "واقٍ من الشمس غير معطّر", "Crème solaire sans parfum", "Unscented sunscreen", "Protector solar sin perfume"),

  item("charger", "phone", "شاحن وبطارية خارجية", "Chargeur et batterie externe", "Charger and power bank", "Cargador y batería externa"),
  item("sim", "phone", "شريحة اتصال أو باقة تجوال", "Carte SIM locale ou forfait d'itinérance", "Local SIM or roaming plan", "Tarjeta SIM local o plan de itinerancia"),
  item("apps", "phone", "تثبيت تطبيق نسك والتطبيقات الرسمية", "Installer l'application Nusuk et les applications officielles", "Install the Nusuk app and official apps", "Instalar la aplicación Nusuk y las aplicaciones oficiales"),
  item("emergency", "phone", "حفظ أرقام الطوارئ وأرقام المرافقين", "Enregistrer les numéros d'urgence et ceux des accompagnants", "Save emergency numbers and companions' numbers", "Guardar los números de emergencia y de los acompañantes"),

  item("install-app", "offline", "تثبيت هذا التطبيق على الشاشة الرئيسية", "Installer cette application sur l'écran d'accueil", "Install this app on your home screen", "Instalar esta aplicación en la pantalla de inicio"),
  item("download-content", "offline", "تنزيل المحتوى للاستخدام دون اتصال", "Télécharger le contenu pour un usage hors ligne", "Download content for offline use", "Descargar el contenido para uso sin conexión"),
  item("test-offline", "offline", "تجربة التطبيق في وضع الطيران", "Tester l'application en mode avion", "Test the app in airplane mode", "Probar la aplicación en modo avión"),
];
