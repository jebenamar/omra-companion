import type { UmrahStep } from "./types";

/**
 * The Umrah journey, in chronological order.
 * Rulings ("pillar", "obligation", "sunnah") follow the commonly taught classification; schools of
 * jurisprudence differ on some points, which are listed under `divergences` rather than hidden.
 * Practical guidance should always be checked against the official Nusuk journey
 * (https://umrah.nusuk.sa/Journey), which may evolve.
 */
export const steps: UmrahStep[] = [
  {
    id: "preparation",
    order: 1,
    arabicName: "الاستعداد",
    title: {
      ar: "الاستعداد قبل العمرة",
      fr: "Préparation avant la Omra",
      en: "Preparing for Umrah",
      es: "Preparación antes de la Umrah",
    },
    summary: {
      ar: "تصحيح النية، والتوبة، وتعلّم أحكام العمرة، وإنجاز الإجراءات النظامية قبل السفر.",
      fr: "Purifier l'intention, se repentir, apprendre les règles de la Omra et accomplir les démarches officielles avant le départ.",
      en: "Purify your intention, repent, learn the rulings of Umrah and complete the official formalities before travelling.",
      es: "Purificar la intención, arrepentirse, aprender las normas de la Umrah y completar los trámites oficiales antes de viajar.",
    },
    whatToDo: [
      {
        text: {
          ar: "أخلص النية لله تعالى، فالعمرة عبادة يُبتغى بها وجهه.",
          fr: "Consacrez votre intention à Allah seul : la Omra est un acte d'adoration accompli pour Lui.",
          en: "Dedicate your intention to Allah alone: Umrah is an act of worship performed for Him.",
          es: "Dedica tu intención solo a Allah: la Umrah es un acto de adoración realizado para Él.",
        },
        sourceIds: ["quran-2-196"],
      },
      {
        text: {
          ar: "تب إلى الله، وردّ المظالم، واطلب المسامحة ممن أسأت إليه.",
          fr: "Repentez-vous, réparez les torts causés et demandez pardon à ceux que vous avez lésés.",
          en: "Repent, right any wrongs and ask forgiveness from those you have harmed.",
          es: "Arrepiéntete, repara los daños causados y pide perdón a quienes hayas perjudicado.",
        },
      },
      {
        text: {
          ar: "احصل على التأشيرة والتصاريح اللازمة عبر القنوات الرسمية (منصة نسك).",
          fr: "Obtenez le visa et les autorisations nécessaires par les canaux officiels (plateforme Nusuk).",
          en: "Obtain the visa and required permits through official channels (Nusuk platform).",
          es: "Obtén el visado y los permisos necesarios por los canales oficiales (plataforma Nusuk).",
        },
        ruling: "practical",
        sourceIds: ["nusuk", "haj-gov"],
      },
      {
        text: {
          ar: "اعرف الميقات الذي ستُحرم منه حسب طريق وصولك، وجهّز ملابس الإحرام.",
          fr: "Identifiez le Miqat où vous entrerez en Ihram selon votre itinéraire, et préparez vos vêtements d'Ihram.",
          en: "Identify the Miqat where you will enter Ihram according to your route, and prepare your Ihram clothing.",
          es: "Identifica el Miqat en el que entrarás en Ihram según tu ruta y prepara tu ropa de Ihram.",
        },
        sourceIds: ["bukhari-1524", "muslim-1181"],
      },
      {
        text: {
          ar: "حمّل محتوى هذا التطبيق للاستخدام دون اتصال قبل السفر.",
          fr: "Téléchargez le contenu de cette application pour une utilisation hors ligne avant le départ.",
          en: "Download this app's content for offline use before departure.",
          es: "Descarga el contenido de esta aplicación para usarlo sin conexión antes de partir.",
        },
        ruling: "practical",
      },
    ],
    howTo: [
      {
        ar: "المواقيت المكانية التي وقّتها النبي ﷺ: ذو الحليفة لأهل المدينة، والجحفة لأهل الشام، وقرن المنازل لأهل نجد، ويلملم لأهل اليمن، «هنّ لهنّ ولمن أتى عليهنّ من غير أهلهنّ». وذات عرق لأهل العراق، وقّتها عمر رضي الله عنه.",
        fr: "Les Miqats fixés par le Prophète ﷺ : Dhul-Hulayfah pour les gens de Médine, Al-Juhfah pour ceux du Cham, Qarn al-Manazil pour ceux du Najd, Yalamlam pour ceux du Yémen ; « ils valent pour leurs habitants et pour quiconque passe par eux ». Dhat 'Irq, pour les gens d'Irak, a été fixé par 'Umar.",
        en: "The Miqats set by the Prophet ﷺ: Dhul-Hulayfah for the people of Madinah, al-Juhfah for the people of Sham, Qarn al-Manazil for the people of Najd, Yalamlam for the people of Yemen; \"they are for their people and for whoever passes by them\". Dhat 'Irq, for the people of Iraq, was set by 'Umar.",
        es: "Los Miqat fijados por el Profeta ﷺ: Dhul-Hulayfa para la gente de Medina, al-Yuhfa para la de Sham, Qarn al-Manazil para la de Nayd, Yalamlam para la de Yemen; «son para sus habitantes y para quien pase por ellos». Dhat 'Irq, para la gente de Irak, lo fijó 'Umar.",
      },
      {
        ar: "من سافر بالطائرة أحرم إذا حاذى الميقات جوًّا؛ لذا يُستحسن لبس ملابس الإحرام قبل الإقلاع أو في الطائرة، وتنبيه الطاقم يساعد على معرفة وقت المحاذاة.",
        fr: "En avion, on entre en Ihram au moment où l'on survole le Miqat (ou son alignement). Il est donc conseillé de revêtir les vêtements d'Ihram avant l'embarquement ou à bord ; l'équipage annonce généralement le passage.",
        en: "By plane, you enter Ihram when flying over (or level with) the Miqat. It is therefore advisable to put on Ihram clothing before boarding or on board; the crew usually announces the crossing.",
        es: "En avión, se entra en Ihram al sobrevolar el Miqat (o su alineación). Por eso se aconseja ponerse la ropa de Ihram antes de embarcar o a bordo; la tripulación suele anunciar el paso.",
      },
    ],
    mistakes: [
      {
        ar: "تجاوز الميقات دون إحرام لمن أراد العمرة.",
        fr: "Dépasser le Miqat sans être en Ihram alors qu'on a l'intention de faire la Omra.",
        en: "Passing the Miqat without Ihram when intending to perform Umrah.",
        es: "Pasar el Miqat sin Ihram teniendo la intención de hacer la Umrah.",
      },
      {
        ar: "الاعتماد على معلومات غير رسمية بشأن التأشيرات والتصاريح.",
        fr: "Se fier à des informations non officielles sur les visas et autorisations.",
        en: "Relying on unofficial information about visas and permits.",
        es: "Fiarse de información no oficial sobre visados y permisos.",
      },
    ],
    duaIds: ["travel"],
    videoIds: [],
    sourceIds: ["quran-2-196", "bukhari-1524", "muslim-1181", "bukhari-1531", "nusuk", "haj-gov"],
    focus: {
      ar: "تأكد من وثائقك، واعرف ميقاتك، وجهّز ملابس الإحرام.",
      fr: "Vérifiez vos documents, connaissez votre Miqat, préparez l'Ihram.",
      en: "Check your documents, know your Miqat, prepare your Ihram.",
      es: "Revisa tus documentos, conoce tu Miqat, prepara el Ihram.",
    },
  },
  {
    id: "ihram",
    order: 2,
    arabicName: "الإحرام",
    title: { ar: "الإحرام", fr: "Ihram", en: "Ihram", es: "Ihram" },
    summary: {
      ar: "الإحرام هو نية الدخول في النسك، وهو ركن من أركان العمرة، ويكون من الميقات.",
      fr: "L'Ihram est l'intention d'entrer dans le rite ; c'est un pilier de la Omra, à accomplir au Miqat.",
      en: "Ihram is the intention to enter the rite; it is a pillar of Umrah, made at the Miqat.",
      es: "El Ihram es la intención de entrar en el rito; es un pilar de la Umrah y se realiza en el Miqat.",
    },
    whatToDo: [
      {
        text: {
          ar: "يُستحب الاغتسال والتنظّف قبل الإحرام، ويتطيّب الرجل في بدنه لا في ثياب الإحرام.",
          fr: "Il est recommandé de faire le grand lavage (ghusl) et de se nettoyer ; l'homme peut se parfumer le corps, mais pas les vêtements d'Ihram.",
          en: "It is recommended to take a full bath (ghusl) and clean yourself; men may perfume the body, but not the Ihram garments.",
          es: "Se recomienda hacer el baño completo (gusl) y asearse; el hombre puede perfumar su cuerpo, pero no la ropa de Ihram.",
        },
        ruling: "sunnah",
      },
      {
        text: {
          ar: "يلبس الرجل إزارًا ورداءً، ويجتنب المخيط المفصّل على البدن. وتلبس المرأة ثيابها المعتادة الساترة دون نقاب ولا قفازين.",
          fr: "L'homme porte deux pièces de tissu (izar et rida') et évite les vêtements cousus à la forme du corps. La femme porte ses vêtements habituels couvrants, sans niqab ni gants.",
          en: "Men wear two pieces of cloth (izar and rida') and avoid garments tailored to the body. Women wear their usual modest clothing, without niqab or gloves.",
          es: "El hombre lleva dos piezas de tela (izar y rida') y evita prendas cosidas a la forma del cuerpo. La mujer lleva su ropa habitual que cubre, sin niqab ni guantes.",
        },
        ruling: "obligation",
        sourceIds: ["bukhari-1542", "muslim-1177", "bukhari-1838"],
      },
      {
        text: {
          ar: "انوِ الدخول في العمرة عند الميقات وقل: «لبيك عمرة».",
          fr: "Formulez l'intention d'entrer en Omra au Miqat et dites : « Labbayka 'umratan ».",
          en: "Make the intention to enter Umrah at the Miqat and say: \"Labbayka 'umratan\".",
          es: "Formula la intención de entrar en la Umrah en el Miqat y di: «Labbayka 'umratan».",
        },
        ruling: "pillar",
        sourceIds: ["muslim-1251"],
      },
      {
        text: {
          ar: "إن خشيت عائقًا يمنعك من الإتمام فاشترط.",
          fr: "Si vous craignez un empêchement, prononcez la formule de condition (ishtirat).",
          en: "If you fear an obstacle preventing completion, say the conditional formula (ishtirat).",
          es: "Si temes un impedimento, pronuncia la fórmula condicional (ishtirat).",
        },
        ruling: "optional",
        sourceIds: ["bukhari-5089", "muslim-1207"],
      },
      {
        text: {
          ar: "ابدأ التلبية واجتنب محظورات الإحرام.",
          fr: "Commencez la Talbiya et évitez les interdits de l'Ihram.",
          en: "Begin the Talbiya and avoid the prohibitions of Ihram.",
          es: "Comienza la Talbiya y evita las prohibiciones del Ihram.",
        },
        ruling: "obligation",
      },
    ],
    howTo: [
      {
        ar: "محظورات الإحرام: إزالة الشعر وتقليم الأظفار، والتطيّب بعد الإحرام، وتغطية الرجل رأسه ولبسه المخيط، وانتقاب المرأة ولبسها القفازين، وقتل الصيد، وعقد النكاح، والجماع ومقدماته، والفسوق والجدال.",
        fr: "Interdits de l'Ihram : enlever des cheveux ou des poils et se couper les ongles, se parfumer après l'entrée en Ihram, pour l'homme se couvrir la tête et porter des vêtements cousus, pour la femme porter le niqab et des gants, chasser, conclure un mariage, les rapports conjugaux et leurs préliminaires, ainsi que la perversité et les disputes.",
        en: "Prohibitions of Ihram: removing hair and clipping nails, applying perfume after entering Ihram, for men covering the head and wearing tailored garments, for women wearing niqab and gloves, hunting, contracting marriage, marital relations and foreplay, as well as wrongdoing and quarrelling.",
        es: "Prohibiciones del Ihram: quitarse cabello o vello y cortarse las uñas, perfumarse tras entrar en Ihram, para el hombre cubrirse la cabeza y llevar prendas cosidas, para la mujer llevar niqab y guantes, cazar, contraer matrimonio, las relaciones conyugales y sus preliminares, así como la perversidad y las discusiones.",
      },
      {
        ar: "لا يُشترط للإحرام صلاة خاصة به عند كثير من العلماء، ومن أحرم بعد صلاة فريضة فحسن.",
        fr: "Il n'existe pas de prière spécifique obligatoire pour l'Ihram selon de nombreux savants ; entrer en Ihram après une prière obligatoire est une bonne pratique.",
        en: "According to many scholars there is no prayer specific to Ihram; entering Ihram after an obligatory prayer is good practice.",
        es: "Según muchos sabios, no existe una oración específica obligatoria para el Ihram; entrar en Ihram tras una oración obligatoria es una buena práctica.",
      },
    ],
    mistakes: [
      {
        ar: "تطييب ثياب الإحرام بعد لبسها، أو التطيّب بعد عقد الإحرام.",
        fr: "Parfumer les vêtements d'Ihram, ou se parfumer après être entré en Ihram.",
        en: "Perfuming the Ihram garments, or applying perfume after entering Ihram.",
        es: "Perfumar la ropa de Ihram o perfumarse tras haber entrado en Ihram.",
      },
      {
        ar: "الاعتقاد بأن الإحرام هو مجرد لبس الثياب دون نية.",
        fr: "Croire que l'Ihram consiste seulement à porter les vêtements, sans intention.",
        en: "Believing that Ihram is merely wearing the garments, without intention.",
        es: "Creer que el Ihram consiste solo en llevar la ropa, sin intención.",
      },
      {
        ar: "كشف الكتف الأيمن (الاضطباع) من حين الإحرام؛ وإنما يُسنّ في طواف القدوم/العمرة فقط.",
        fr: "Découvrir l'épaule droite (idtiba') dès l'entrée en Ihram : cela n'est recommandé que pendant le Tawaf.",
        en: "Uncovering the right shoulder (idtiba') from the moment of Ihram: it is only recommended during Tawaf.",
        es: "Descubrir el hombro derecho (idtiba') desde la entrada en Ihram: solo se recomienda durante el Tawaf.",
      },
    ],
    divergences: [
      {
        ar: "اختلف العلماء في حكم ركعتي الإحرام: فاستحبها الجمهور، ورأى آخرون أنه لا صلاة تخصّ الإحرام.",
        fr: "Les savants divergent sur la prière de deux unités pour l'Ihram : la majorité la recommande, d'autres estiment qu'aucune prière n'est propre à l'Ihram.",
        en: "Scholars differ on a two-unit prayer for Ihram: the majority recommend it, others hold that no prayer is specific to Ihram.",
        es: "Los sabios difieren sobre una oración de dos unidades para el Ihram: la mayoría la recomienda, otros consideran que ninguna oración es propia del Ihram.",
      },
    ],
    duaIds: ["ihram-intention", "ishtirat", "talbiya"],
    videoIds: [],
    sourceIds: [
      "bukhari-1542",
      "muslim-1177",
      "bukhari-1838",
      "muslim-1251",
      "muslim-1409",
      "quran-2-197",
      "quran-5-95",
      "nusuk-umrah-journey",
    ],
    focus: {
      ar: "انوِ العمرة عند الميقات وقل: لبيك عمرة. اجتنب المحظورات.",
      fr: "Au Miqat : intention + « Labbayka 'umratan ». Évitez les interdits.",
      en: "At the Miqat: intention + \"Labbayka 'umratan\". Avoid the prohibitions.",
      es: "En el Miqat: intención + «Labbayka 'umratan». Evita las prohibiciones.",
    },
  },
  {
    id: "talbiya",
    order: 3,
    arabicName: "التلبية",
    title: { ar: "التلبية", fr: "Talbiya", en: "Talbiya", es: "Talbiya" },
    summary: {
      ar: "ذكر شعار النسك، يُكثر منه المحرم من الإحرام حتى بدء الطواف.",
      fr: "La formule emblématique du pèlerin, répétée de l'entrée en Ihram jusqu'au début du Tawaf.",
      en: "The pilgrim's emblematic formula, repeated from entering Ihram until beginning Tawaf.",
      es: "La fórmula emblemática del peregrino, repetida desde la entrada en Ihram hasta el inicio del Tawaf.",
    },
    whatToDo: [
      {
        text: {
          ar: "ردّد التلبية كما وردت عن النبي ﷺ.",
          fr: "Répétez la Talbiya telle que transmise par le Prophète ﷺ.",
          en: "Repeat the Talbiya as transmitted from the Prophet ﷺ.",
          es: "Repite la Talbiya tal como se transmitió del Profeta ﷺ.",
        },
        ruling: "sunnah",
        sourceIds: ["bukhari-1549", "muslim-1184"],
      },
      {
        text: {
          ar: "يرفع الرجل صوته بها، وتخفض المرأة صوتها.",
          fr: "L'homme élève la voix ; la femme la dit à voix basse.",
          en: "Men raise their voices; women say it quietly.",
          es: "El hombre eleva la voz; la mujer la dice en voz baja.",
        },
        ruling: "sunnah",
      },
      {
        text: {
          ar: "اقطع التلبية عند البدء في الطواف.",
          fr: "Arrêtez la Talbiya en commençant le Tawaf.",
          en: "Stop the Talbiya when you begin Tawaf.",
          es: "Deja la Talbiya al comenzar el Tawaf.",
        },
      },
    ],
    howTo: [
      {
        ar: "التلبية إعلان للتوحيد وإجابة لدعوة الله. أكثر منها في الطريق، وعند تغيّر الأحوال كالصعود والنزول، مع حضور القلب وتدبّر معانيها.",
        fr: "La Talbiya est une proclamation de l'unicité d'Allah et une réponse à Son appel. Répétez-la abondamment en chemin et lors des changements de situation (montée, descente), avec présence du cœur et méditation de son sens.",
        en: "The Talbiya proclaims the oneness of Allah and answers His call. Repeat it often along the way and at changes of situation (going up, going down), with a present heart and reflecting on its meaning.",
        es: "La Talbiya proclama la unicidad de Allah y responde a Su llamada. Repítela a menudo en el camino y en los cambios de situación (subidas, bajadas), con el corazón presente y meditando su significado.",
      },
    ],
    mistakes: [
      {
        ar: "التلبية الجماعية بصوت واحد بطريقة منظمة.",
        fr: "La Talbiya collective scandée à l'unisson de manière organisée.",
        en: "Collective Talbiya chanted in unison in an organised way.",
        es: "La Talbiya colectiva coreada al unísono de forma organizada.",
      },
      {
        ar: "رفع المرأة صوتها بالتلبية بين الرجال.",
        fr: "Pour la femme, élever la voix au milieu des hommes.",
        en: "For women, raising the voice among men.",
        es: "Para la mujer, elevar la voz entre los hombres.",
      },
    ],
    duaIds: ["talbiya"],
    videoIds: [],
    sourceIds: ["bukhari-1549", "muslim-1184"],
    focus: {
      ar: "ردّد التلبية حتى تبدأ الطواف.",
      fr: "Répétez la Talbiya jusqu'au début du Tawaf.",
      en: "Repeat the Talbiya until you start Tawaf.",
      es: "Repite la Talbiya hasta el inicio del Tawaf.",
    },
  },
  {
    id: "entering-haram",
    order: 4,
    arabicName: "دخول المسجد الحرام",
    title: {
      ar: "دخول المسجد الحرام",
      fr: "Entrée dans Masjid al-Haram",
      en: "Entering Masjid al-Haram",
      es: "Entrada en Masyid al-Haram",
    },
    summary: {
      ar: "ادخل المسجد بأدب وسكينة، وقل دعاء دخول المسجد، واتجه إلى المطاف.",
      fr: "Entrez dans la mosquée avec respect et sérénité, dites l'invocation d'entrée et dirigez-vous vers l'aire du Tawaf (Mataf).",
      en: "Enter the mosque with respect and calm, say the entry supplication and head to the Tawaf area (Mataf).",
      es: "Entra en la mezquita con respeto y serenidad, di la súplica de entrada y dirígete al área del Tawaf (Mataf).",
    },
    whatToDo: [
      {
        text: {
          ar: "ادخل بسكينة وقل دعاء دخول المسجد.",
          fr: "Entrez avec sérénité et dites l'invocation d'entrée dans la mosquée.",
          en: "Enter calmly and say the supplication for entering the mosque.",
          es: "Entra con serenidad y di la súplica de entrada en la mezquita.",
        },
        ruling: "sunnah",
        sourceIds: ["muslim-713", "abudawud-466"],
      },
      {
        text: {
          ar: "اتبع اللوحات الإرشادية وتوجيهات المنظمين للوصول إلى صحن المطاف.",
          fr: "Suivez la signalétique et les consignes des agents pour rejoindre l'aire du Tawaf.",
          en: "Follow the signs and staff instructions to reach the Tawaf area.",
          es: "Sigue la señalización y las indicaciones del personal para llegar al área del Tawaf.",
        },
        ruling: "practical",
        sourceIds: ["alharamain"],
      },
      {
        text: {
          ar: "تأكد من طهارتك (الوضوء) قبل بدء الطواف.",
          fr: "Assurez-vous d'être en état de pureté (ablutions) avant de commencer le Tawaf.",
          en: "Make sure you are in a state of purity (wudu') before starting Tawaf.",
          es: "Asegúrate de estar en estado de pureza (ablución) antes de empezar el Tawaf.",
        },
        ruling: "obligation",
        sourceIds: ["bukhari-305"],
      },
      {
        text: {
          ar: "حدّد نقطة التقاء مع مرافقيك في حال الافتراق.",
          fr: "Convenez d'un point de rendez-vous avec vos accompagnants en cas de séparation.",
          en: "Agree on a meeting point with your companions in case you get separated.",
          es: "Acuerda un punto de encuentro con tus acompañantes por si os separáis.",
        },
        ruling: "practical",
      },
    ],
    howTo: [
      {
        ar: "المسجد الحرام أول بيت وُضع للناس. فإذا رأيت الكعبة فاستحضر عظمة المكان، واشغل نفسك بالذكر والدعاء، ولا يُشرع للمعتمر الذي يريد الطواف أن يصلي تحية المسجد، فإن الطواف يقوم مقامها.",
        fr: "Masjid al-Haram abrite la première Maison édifiée pour les hommes. Lorsque vous voyez la Kaaba, prenez conscience de la grandeur du lieu et occupez-vous d'évocations et d'invocations. Pour celui qui va directement faire le Tawaf, le Tawaf remplace la prière de salutation de la mosquée.",
        en: "Masjid al-Haram houses the first House established for mankind. When you see the Ka'bah, be mindful of the greatness of the place and occupy yourself with remembrance and supplication. For someone going directly to Tawaf, the Tawaf takes the place of the prayer greeting the mosque.",
        es: "Masyid al-Haram alberga la primera Casa establecida para la humanidad. Al ver la Kaaba, toma conciencia de la grandeza del lugar y ocúpate del recuerdo y la súplica. Para quien va directamente al Tawaf, el Tawaf sustituye la oración de saludo a la mezquita.",
      },
    ],
    mistakes: [
      {
        ar: "مزاحمة الناس وإيذاؤهم عند الأبواب.",
        fr: "Bousculer et gêner les gens aux portes.",
        en: "Pushing and inconveniencing people at the gates.",
        es: "Empujar y molestar a la gente en las puertas.",
      },
      {
        ar: "اعتقاد دعاء خاص عند رؤية الكعبة لم يثبت.",
        fr: "Croire en une invocation spécifique, non établie, à réciter à la vue de la Kaaba.",
        en: "Believing in a specific, unestablished supplication to recite on seeing the Ka'bah.",
        es: "Creer en una súplica específica, no establecida, para recitar al ver la Kaaba.",
      },
    ],
    duaIds: ["enter-mosque", "enter-mosque-refuge"],
    videoIds: [],
    sourceIds: ["quran-3-96-97", "muslim-713", "abudawud-466", "alharamain"],
    focus: {
      ar: "قل دعاء دخول المسجد، تأكد من وضوئك، اتجه إلى المطاف.",
      fr: "Invocation d'entrée, vérifiez vos ablutions, allez au Mataf.",
      en: "Entry supplication, check your wudu', go to the Mataf.",
      es: "Súplica de entrada, revisa tu ablución, ve al Mataf.",
    },
  },
  {
    id: "tawaf",
    order: 5,
    arabicName: "الطواف",
    title: { ar: "الطواف", fr: "Tawaf", en: "Tawaf", es: "Tawaf" },
    summary: {
      ar: "سبعة أشواط حول الكعبة، تبدأ من الحجر الأسود وتنتهي إليه، والكعبة عن يسارك. وهو ركن من أركان العمرة.",
      fr: "Sept tours autour de la Kaaba, commençant et finissant à la Pierre noire, la Kaaba à votre gauche. C'est un pilier de la Omra.",
      en: "Seven circuits around the Ka'bah, starting and ending at the Black Stone, with the Ka'bah on your left. It is a pillar of Umrah.",
      es: "Siete vueltas alrededor de la Kaaba, empezando y terminando en la Piedra Negra, con la Kaaba a tu izquierda. Es un pilar de la Umrah.",
    },
    whatToDo: [
      {
        text: {
          ar: "يكشف الرجل كتفه الأيمن (الاضطباع) طوال أشواط الطواف.",
          fr: "L'homme découvre son épaule droite (idtiba') pendant tout le Tawaf.",
          en: "Men uncover the right shoulder (idtiba') throughout the Tawaf.",
          es: "El hombre descubre su hombro derecho (idtiba') durante todo el Tawaf.",
        },
        ruling: "sunnah",
        sourceIds: ["abudawud-1884"],
      },
      {
        text: {
          ar: "ابدأ من محاذاة الحجر الأسود: استلمه وقبّله إن تيسّر دون أذى، وإلا فأشر إليه بيدك وكبّر.",
          fr: "Commencez face à la Pierre noire : touchez-la et embrassez-la si c'est possible sans nuire à personne ; sinon, faites un signe de la main vers elle et dites « Allahu akbar ».",
          en: "Start level with the Black Stone: touch and kiss it if possible without harming anyone; otherwise gesture towards it with your hand and say \"Allahu akbar\".",
          es: "Empieza frente a la Piedra Negra: tócala y bésala si es posible sin dañar a nadie; si no, señálala con la mano y di «Allahu akbar».",
        },
        ruling: "sunnah",
        sourceIds: ["bukhari-1597", "muslim-1270", "bukhari-1613"],
      },
      {
        text: {
          ar: "طف سبعة أشواط والكعبة عن يسارك، من وراء الحِجْر (حِجْر إسماعيل).",
          fr: "Effectuez sept tours, la Kaaba à votre gauche, en passant à l'extérieur du Hijr (Hijr Isma'il).",
          en: "Perform seven circuits with the Ka'bah on your left, passing outside the Hijr (Hijr Isma'il).",
          es: "Realiza siete vueltas con la Kaaba a tu izquierda, pasando por fuera del Hiyr (Hiyr Isma'il).",
        },
        ruling: "pillar",
        sourceIds: ["quran-22-29", "muslim-1218"],
      },
      {
        text: {
          ar: "يُسنّ للرجل الرَّمَل (الإسراع مع مقاربة الخطى) في الأشواط الثلاثة الأولى، والمشي في الأربعة الباقية.",
          fr: "Pour l'homme, il est recommandé de presser le pas à petites enjambées (raml) durant les trois premiers tours, puis de marcher normalement les quatre derniers.",
          en: "For men, it is recommended to walk briskly with short steps (raml) in the first three circuits, then walk normally in the last four.",
          es: "Para el hombre, se recomienda apretar el paso con zancadas cortas (raml) en las tres primeras vueltas y caminar con normalidad en las cuatro últimas.",
        },
        ruling: "sunnah",
        sourceIds: ["muslim-1218"],
      },
      {
        text: {
          ar: "استلم الركن اليماني بيدك إن تيسّر دون تقبيل ولا إشارة، وقل بينه وبين الحجر الأسود: ربنا آتنا في الدنيا حسنة…",
          fr: "Touchez de la main le Coin yéménite si c'est possible, sans l'embrasser ni faire de signe ; entre lui et la Pierre noire, dites : « Rabbana atina fi-d-dunya hasanah… »",
          en: "Touch the Yemeni Corner with your hand if possible, without kissing it or gesturing; between it and the Black Stone, say: \"Rabbana atina fi-d-dunya hasanah…\"",
          es: "Toca con la mano la Esquina Yemení si es posible, sin besarla ni señalarla; entre ella y la Piedra Negra di: «Rabbana atina fi-d-dunya hasanah…»",
        },
        ruling: "sunnah",
        sourceIds: ["bukhari-1609", "muslim-1267", "abudawud-1892"],
      },
      {
        text: {
          ar: "اشغل بقية الطواف بما شئت من الذكر والدعاء وقراءة القرآن، بأي لغة.",
          fr: "Pendant le reste du Tawaf, faites librement des évocations, des invocations ou lisez le Coran, dans la langue de votre choix pour les invocations.",
          en: "For the rest of the Tawaf, freely make remembrance, supplication or recite the Qur'an; supplications may be in any language.",
          es: "Durante el resto del Tawaf, haz libremente recuerdo, súplicas o recita el Corán; las súplicas pueden hacerse en cualquier idioma.",
        },
        ruling: "optional",
      },
    ],
    howTo: [
      {
        ar: "الشوط يبدأ من الحجر الأسود وينتهي إليه. علامة البداية: الخط أو الإضاءة الخضراء المحاذية للحجر الأسود على جدار المسجد (بحسب الترتيبات الحالية). وإن شككت في عدد الأشواط فابنِ على الأقل.",
        fr: "Un tour commence et finit à la Pierre noire. Repère de départ : l'alignement de la Pierre noire, souvent signalé par un éclairage vert sur le mur de la mosquée (selon les aménagements actuels). En cas de doute sur le nombre de tours, retenez le nombre le plus petit.",
        en: "A circuit starts and ends at the Black Stone. Starting marker: alignment with the Black Stone, often indicated by a green light on the mosque wall (according to current arrangements). If in doubt about the number of circuits, count the lower number.",
        es: "Una vuelta empieza y termina en la Piedra Negra. Referencia de inicio: la alineación con la Piedra Negra, a menudo indicada por una luz verde en la pared de la mezquita (según la disposición actual). Si dudas del número de vueltas, quédate con el número menor.",
      },
      {
        ar: "لم يثبت دعاء خاص لكل شوط من أشواط الطواف. فادعُ بما تحب، وأكثر من الذكر.",
        fr: "Aucune invocation spécifique à chaque tour n'est établie. Invoquez Allah avec ce que vous souhaitez et multipliez les évocations.",
        en: "No specific supplication for each circuit is established. Call upon Allah with whatever you wish and remember Him abundantly.",
        es: "No está establecida ninguna súplica específica para cada vuelta. Invoca a Allah con lo que desees y recuérdalo abundantemente.",
      },
      {
        ar: "الحائض لا تطوف حتى تطهر، وتفعل ما يفعله الحاج غير ألّا تطوف بالبيت.",
        fr: "La femme en période de menstrues ne fait pas le Tawaf jusqu'à ce qu'elle soit pure ; elle peut accomplir les autres actes, sauf le Tawaf autour de la Maison.",
        en: "A menstruating woman does not perform Tawaf until she is pure; she may do the other acts except Tawaf around the House.",
        es: "La mujer menstruante no realiza el Tawaf hasta purificarse; puede hacer los demás actos salvo el Tawaf alrededor de la Casa.",
      },
    ],
    mistakes: [
      {
        ar: "مزاحمة الناس وإيذاؤهم لتقبيل الحجر الأسود.",
        fr: "Bousculer et blesser des personnes pour embrasser la Pierre noire.",
        en: "Pushing and harming people to kiss the Black Stone.",
        es: "Empujar y lastimar a otras personas para besar la Piedra Negra.",
      },
      {
        ar: "الطواف داخل الحِجْر؛ فلا يُحسب ذلك الشوط.",
        fr: "Passer à l'intérieur du Hijr : ce tour n'est alors pas comptabilisé.",
        en: "Passing inside the Hijr: that circuit then does not count.",
        es: "Pasar por dentro del Hiyr: esa vuelta no cuenta.",
      },
      {
        ar: "التمسّح بجدران الكعبة والمقام طلبًا للبركة.",
        fr: "Se frotter aux murs de la Kaaba ou à la station d'Ibrahim pour en tirer une bénédiction.",
        en: "Rubbing the walls of the Ka'bah or the Station of Ibrahim seeking blessing.",
        es: "Frotarse contra los muros de la Kaaba o el lugar de Ibrahim buscando bendición.",
      },
      {
        ar: "التزام كتيّبات فيها دعاء مخصوص لكل شوط، أو الدعاء الجماعي بصوت مرتفع يشوّش على الطائفين.",
        fr: "Suivre des livrets proposant une invocation propre à chaque tour, ou des invocations collectives à voix forte qui dérangent les autres.",
        en: "Following booklets with a specific supplication for each circuit, or loud collective supplications that disturb others.",
        es: "Seguir folletos con una súplica específica para cada vuelta, o súplicas colectivas en voz alta que molestan a los demás.",
      },
    ],
    divergences: [
      {
        ar: "اشترط جمهور العلماء الطهارة من الحدث لصحة الطواف، ورأى الحنفية أنها واجبة لا شرط، ويُجبر تركها بدم.",
        fr: "La majorité des savants fait de la pureté rituelle une condition de validité du Tawaf ; les hanafites la considèrent obligatoire (wajib) sans en faire une condition, son omission étant compensée par un sacrifice.",
        en: "The majority of scholars make ritual purity a condition for a valid Tawaf; the Hanafis consider it obligatory (wajib) but not a condition, its omission being compensated by a sacrifice.",
        es: "La mayoría de los sabios considera la pureza ritual una condición de validez del Tawaf; los hanafíes la consideran obligatoria (wayib) sin ser condición, compensándose su omisión con un sacrificio.",
      },
    ],
    duaIds: ["takbir-black-stone", "rabbana-atina"],
    videoIds: [],
    sourceIds: [
      "quran-22-29",
      "muslim-1218",
      "bukhari-1613",
      "bukhari-1597",
      "muslim-1270",
      "bukhari-1609",
      "muslim-1267",
      "abudawud-1884",
      "abudawud-1892",
      "bukhari-305",
    ],
    counter: "tawaf",
    focus: {
      ar: "سبعة أشواط، الكعبة عن يسارك. كبّر عند الحجر الأسود. ربنا آتنا… بين الركنين.",
      fr: "7 tours, Kaaba à gauche. « Allahu akbar » à la Pierre noire. « Rabbana atina… » entre les deux coins.",
      en: "7 circuits, Ka'bah on your left. \"Allahu akbar\" at the Black Stone. \"Rabbana atina…\" between the corners.",
      es: "7 vueltas, Kaaba a la izquierda. «Allahu akbar» en la Piedra Negra. «Rabbana atina…» entre las esquinas.",
    },
  },
  {
    id: "prayer-zamzam",
    order: 6,
    arabicName: "ركعتا الطواف وزمزم",
    title: {
      ar: "ركعتا الطواف وماء زمزم",
      fr: "Prière après le Tawaf et Zamzam",
      en: "Prayer after Tawaf and Zamzam",
      es: "Oración tras el Tawaf y Zamzam",
    },
    summary: {
      ar: "صلِّ ركعتين خلف مقام إبراهيم إن تيسّر، ثم اشرب من ماء زمزم.",
      fr: "Priez deux unités derrière la station d'Ibrahim si possible, puis buvez de l'eau de Zamzam.",
      en: "Pray two units behind the Station of Ibrahim if possible, then drink Zamzam water.",
      es: "Reza dos unidades detrás del lugar de Ibrahim si es posible y luego bebe agua de Zamzam.",
    },
    whatToDo: [
      {
        text: {
          ar: "غطِّ كتفك الأيمن بعد انتهاء الطواف.",
          fr: "Recouvrez votre épaule droite à la fin du Tawaf.",
          en: "Cover your right shoulder after finishing Tawaf.",
          es: "Cubre tu hombro derecho al terminar el Tawaf.",
        },
      },
      {
        text: {
          ar: "صلِّ ركعتين خلف المقام إن تيسّر، وإلا ففي أي مكان من المسجد، واقرأ فيهما الكافرون والإخلاص.",
          fr: "Priez deux unités derrière la station d'Ibrahim si c'est possible, sinon n'importe où dans la mosquée, en récitant Al-Kafirun puis Al-Ikhlas.",
          en: "Pray two units behind the Station if possible, otherwise anywhere in the mosque, reciting Al-Kafirun and Al-Ikhlas.",
          es: "Reza dos unidades detrás del lugar de Ibrahim si es posible, o en cualquier lugar de la mezquita, recitando Al-Kafirun y Al-Ijlas.",
        },
        ruling: "sunnah",
        sourceIds: ["quran-2-125", "muslim-1218"],
      },
      {
        text: {
          ar: "اشرب من ماء زمزم وادعُ بما شئت.",
          fr: "Buvez de l'eau de Zamzam et invoquez Allah pour ce que vous souhaitez.",
          en: "Drink Zamzam water and supplicate for whatever you wish.",
          es: "Bebe agua de Zamzam y suplica por lo que desees.",
        },
        ruling: "sunnah",
        sourceIds: ["muslim-2473", "ibnmajah-3062"],
      },
      {
        text: {
          ar: "إن تيسّر فارجع إلى الحجر الأسود فاستلمه قبل الذهاب إلى الصفا.",
          fr: "Si c'est facile, revenez toucher la Pierre noire avant de vous rendre à As-Safa.",
          en: "If easy, return to touch the Black Stone before going to as-Safa.",
          es: "Si es fácil, vuelve a tocar la Piedra Negra antes de ir a as-Safa.",
        },
        ruling: "sunnah",
        sourceIds: ["muslim-1218"],
      },
    ],
    howTo: [
      {
        ar: "قال النبي ﷺ عن زمزم: «إنها مباركة، إنها طعام طُعْم». وتتوفر حافظات ماء زمزم في أرجاء المسجد.",
        fr: "Le Prophète ﷺ a dit de Zamzam : « Elle est bénie ; c'est une nourriture qui rassasie. » Des fontaines et réservoirs d'eau de Zamzam sont disponibles dans toute la mosquée.",
        en: "The Prophet ﷺ said of Zamzam: \"It is blessed; it is food that satisfies.\" Zamzam water containers are available throughout the mosque.",
        es: "El Profeta ﷺ dijo de Zamzam: «Es bendita; es un alimento que sacia». Hay contenedores de agua de Zamzam por toda la mezquita.",
      },
    ],
    mistakes: [
      {
        ar: "الصلاة خلف المقام في وقت الزحام بما يعيق الطائفين.",
        fr: "Prier juste derrière la station d'Ibrahim en pleine affluence, en gênant ceux qui font le Tawaf.",
        en: "Praying right behind the Station during crowding, obstructing those performing Tawaf.",
        es: "Rezar justo detrás del lugar de Ibrahim en plena aglomeración, obstaculizando a quienes hacen el Tawaf.",
      },
      {
        ar: "إطالة الركعتين بلا حاجة مع الزحام.",
        fr: "Prolonger ces deux unités sans nécessité quand il y a foule.",
        en: "Lengthening these two units unnecessarily when it is crowded.",
        es: "Alargar estas dos unidades sin necesidad cuando hay mucha gente.",
      },
    ],
    duaIds: ["maqam-ibrahim"],
    videoIds: [],
    sourceIds: ["quran-2-125", "muslim-1218", "muslim-2473", "ibnmajah-3062"],
    focus: {
      ar: "ركعتان خلف المقام (الكافرون، الإخلاص)، ثم زمزم.",
      fr: "2 unités derrière la station (Al-Kafirun, Al-Ikhlas), puis Zamzam.",
      en: "2 units behind the Station (Al-Kafirun, Al-Ikhlas), then Zamzam.",
      es: "2 unidades detrás del lugar (Al-Kafirun, Al-Ijlas), luego Zamzam.",
    },
  },
  {
    id: "sai",
    order: 7,
    arabicName: "السعي",
    title: { ar: "السعي بين الصفا والمروة", fr: "Sa'i", en: "Sa'i", es: "Sa'i" },
    summary: {
      ar: "سبعة أشواط بين الصفا والمروة، تبدأ بالصفا وتنتهي بالمروة. وهو ركن من أركان العمرة عند الجمهور.",
      fr: "Sept trajets entre As-Safa et Al-Marwa, en commençant par As-Safa et en terminant à Al-Marwa. C'est un pilier de la Omra selon la majorité des savants.",
      en: "Seven laps between as-Safa and al-Marwah, starting at as-Safa and ending at al-Marwah. It is a pillar of Umrah according to the majority of scholars.",
      es: "Siete trayectos entre as-Safa y al-Marwa, empezando en as-Safa y terminando en al-Marwa. Es un pilar de la Umrah según la mayoría de los sabios.",
    },
    whatToDo: [
      {
        text: {
          ar: "عند الاقتراب من الصفا اقرأ: ﴿إن الصفا والمروة من شعائر الله﴾ وقل: أبدأ بما بدأ الله به.",
          fr: "En approchant d'As-Safa, récitez « Inna-s-Safa wa-l-Marwata min sha'a'iri-llah » et dites : « Je commence par ce par quoi Allah a commencé. »",
          en: "Approaching as-Safa, recite \"Inna-s-Safa wa-l-Marwata min sha'a'iri-llah\" and say: \"I begin with what Allah began with.\"",
          es: "Al acercarte a as-Safa, recita «Inna-s-Safa wa-l-Marwata min sha'a'iri-llah» y di: «Comienzo por aquello con lo que Allah comenzó».",
        },
        ruling: "sunnah",
        sourceIds: ["quran-2-158", "muslim-1218"],
      },
      {
        text: {
          ar: "اصعد الصفا واستقبل الكعبة، وارفع يديك، وكبّر وهلّل وادعُ، ثلاث مرات.",
          fr: "Montez sur As-Safa, tournez-vous vers la Kaaba, levez les mains, proclamez la grandeur et l'unicité d'Allah et invoquez-Le, trois fois.",
          en: "Climb as-Safa, face the Ka'bah, raise your hands, proclaim Allah's greatness and oneness and supplicate, three times.",
          es: "Sube a as-Safa, oriéntate hacia la Kaaba, levanta las manos, proclama la grandeza y unicidad de Allah y suplica, tres veces.",
        },
        ruling: "sunnah",
        sourceIds: ["muslim-1218"],
      },
      {
        text: {
          ar: "امشِ إلى المروة؛ ويُسنّ للرجل الإسراع بين العلمين الأخضرين.",
          fr: "Marchez vers Al-Marwa ; l'homme presse le pas entre les deux repères verts.",
          en: "Walk towards al-Marwah; men hasten their pace between the two green markers.",
          es: "Camina hacia al-Marwa; el hombre acelera el paso entre las dos señales verdes.",
        },
        ruling: "sunnah",
        sourceIds: ["muslim-1218"],
      },
      {
        text: {
          ar: "افعل على المروة ما فعلت على الصفا. الذهاب شوط، والرجوع شوط، حتى تتم سبعة أشواط تنتهي بالمروة.",
          fr: "Faites sur Al-Marwa ce que vous avez fait sur As-Safa. L'aller compte pour un trajet, le retour pour un autre, jusqu'à sept trajets se terminant à Al-Marwa.",
          en: "Do at al-Marwah what you did at as-Safa. Going counts as one lap, returning as another, until seven laps ending at al-Marwah.",
          es: "Haz en al-Marwa lo mismo que en as-Safa. La ida cuenta como un trayecto y la vuelta como otro, hasta siete trayectos que terminan en al-Marwa.",
        },
        ruling: "pillar",
        sourceIds: ["muslim-1218"],
      },
    ],
    howTo: [
      {
        ar: "لا تُشترط الطهارة للسعي عند جمهور العلماء، لكنها أفضل. ولم يثبت دعاء خاص لكل شوط، فادعُ بما شئت.",
        fr: "Selon la majorité des savants, la pureté rituelle n'est pas une condition du Sa'i, mais elle est préférable. Aucune invocation propre à chaque trajet n'est établie : invoquez librement.",
        en: "According to the majority of scholars, ritual purity is not a condition for Sa'i, but it is preferable. No specific supplication for each lap is established: supplicate freely.",
        es: "Según la mayoría de los sabios, la pureza ritual no es condición del Sa'i, aunque es preferible. No está establecida ninguna súplica específica para cada trayecto: suplica libremente.",
      },
      {
        ar: "يتوفر في المسعى مسار مخصص للعربات لكبار السن وذوي الإعاقة.",
        fr: "Le Mas'a dispose de voies dédiées aux fauteuils roulants pour les personnes âgées ou à mobilité réduite.",
        en: "The Mas'a has dedicated lanes for wheelchairs for elderly people and people with reduced mobility.",
        es: "El Mas'a dispone de carriles dedicados a sillas de ruedas para personas mayores o con movilidad reducida.",
      },
    ],
    mistakes: [
      {
        ar: "عدّ الذهاب والإياب شوطًا واحدًا.",
        fr: "Compter un aller-retour comme un seul trajet.",
        en: "Counting a round trip as a single lap.",
        es: "Contar una ida y vuelta como un solo trayecto.",
      },
      {
        ar: "إسراع المرأة بين العلمين الأخضرين.",
        fr: "Pour la femme, courir entre les repères verts.",
        en: "For women, running between the green markers.",
        es: "Para la mujer, correr entre las señales verdes.",
      },
      {
        ar: "البدء بالمروة.",
        fr: "Commencer par Al-Marwa.",
        en: "Starting at al-Marwah.",
        es: "Empezar por al-Marwa.",
      },
    ],
    divergences: [
      {
        ar: "السعي ركن عند الجمهور (المالكية والشافعية والحنابلة)، وواجب عند الحنفية يُجبر بدم.",
        fr: "Le Sa'i est un pilier selon la majorité (malikites, chafiites, hanbalites) et une obligation (wajib) compensable par un sacrifice selon les hanafites.",
        en: "Sa'i is a pillar according to the majority (Malikis, Shafi'is, Hanbalis) and an obligation (wajib) compensable by a sacrifice according to the Hanafis.",
        es: "El Sa'i es un pilar según la mayoría (malikíes, shafiíes, hanbalíes) y una obligación (wayib) compensable con un sacrificio según los hanafíes.",
      },
    ],
    duaIds: ["safa-verse", "safa-dhikr"],
    videoIds: [],
    sourceIds: ["quran-2-158", "muslim-1218"],
    counter: "sai",
    focus: {
      ar: "ابدأ بالصفا، سبعة أشواط، اختم بالمروة. الذكر على الصفا والمروة.",
      fr: "Commencez à As-Safa, 7 trajets, finissez à Al-Marwa. Dhikr sur As-Safa et Al-Marwa.",
      en: "Start at as-Safa, 7 laps, finish at al-Marwah. Dhikr on as-Safa and al-Marwah.",
      es: "Empieza en as-Safa, 7 trayectos, termina en al-Marwa. Dhikr en as-Safa y al-Marwa.",
    },
  },
  {
    id: "halq-taqsir",
    order: 8,
    arabicName: "الحلق أو التقصير",
    title: {
      ar: "الحلق أو التقصير",
      fr: "Halq ou Taqsir",
      en: "Halq or Taqsir",
      es: "Halq o Taqsir",
    },
    summary: {
      ar: "يحلق الرجل رأسه أو يقصّره، والحلق أفضل. وتقصّر المرأة من شعرها قدر أنملة.",
      fr: "L'homme se rase la tête ou raccourcit ses cheveux, le rasage étant meilleur. La femme raccourcit ses cheveux d'environ une phalange.",
      en: "Men shave the head or shorten the hair, shaving being better. Women shorten their hair by about a fingertip's length.",
      es: "El hombre se rapa la cabeza o se recorta el cabello, siendo mejor el rapado. La mujer se recorta el cabello aproximadamente la longitud de una falange.",
    },
    whatToDo: [
      {
        text: {
          ar: "يحلق الرجل جميع رأسه أو يقصّر من جميعه.",
          fr: "L'homme rase toute sa tête ou raccourcit l'ensemble de ses cheveux.",
          en: "Men shave the whole head or shorten hair from all over the head.",
          es: "El hombre se rapa toda la cabeza o recorta el cabello de toda ella.",
        },
        ruling: "obligation",
        sourceIds: ["quran-48-27", "bukhari-1727", "muslim-1301"],
      },
      {
        text: {
          ar: "تجمع المرأة شعرها وتقصّ من أطرافه قدر أنملة، ولا تحلق.",
          fr: "La femme rassemble ses cheveux et en coupe l'extrémité (environ une phalange) ; elle ne se rase pas.",
          en: "Women gather their hair and cut about a fingertip's length from the ends; they do not shave.",
          es: "La mujer reúne su cabello y corta de las puntas aproximadamente una falange; no se rapa.",
        },
        ruling: "obligation",
        sourceIds: ["abudawud-1985"],
      },
      {
        text: {
          ar: "استعن بالحلاقين المرخّصين في محيط الحرم.",
          fr: "Faites appel aux barbiers agréés autour de la mosquée.",
          en: "Use licensed barbers around the mosque.",
          es: "Acude a los barberos autorizados alrededor de la mezquita.",
        },
        ruling: "practical",
      },
    ],
    howTo: [
      {
        ar: "بالحلق أو التقصير يتحلّل المعتمر من إحرامه، فيحلّ له كل ما حُرّم عليه بالإحرام.",
        fr: "Par le rasage ou le raccourcissement, le pèlerin sort de l'état d'Ihram : tout ce qui lui était interdit redevient permis.",
        en: "By shaving or shortening, the pilgrim leaves the state of Ihram: everything that was prohibited becomes permissible again.",
        es: "Con el rapado o el recorte, el peregrino sale del estado de Ihram: todo lo que le estaba prohibido vuelve a ser lícito.",
      },
    ],
    mistakes: [
      {
        ar: "الاكتفاء بقص شعرات قليلة من جانب واحد للرجل.",
        fr: "Pour l'homme, se contenter de couper quelques cheveux d'un seul côté.",
        en: "For men, cutting only a few hairs from one side.",
        es: "Para el hombre, cortar solo unos pocos cabellos de un lado.",
      },
      {
        ar: "حلق المرأة رأسها.",
        fr: "Pour la femme, se raser la tête.",
        en: "For women, shaving the head.",
        es: "Para la mujer, raparse la cabeza.",
      },
    ],
    divergences: [
      {
        ar: "اختلف العلماء في القدر المجزئ من التقصير للرجل: فمنهم من اشترط التعميم أو أكثر الرأس، ومنهم من أجاز بعضه.",
        fr: "Les savants divergent sur la quantité minimale de raccourcissement pour l'homme : certains exigent toute la tête ou sa majeure partie, d'autres admettent une partie.",
        en: "Scholars differ on the minimum shortening for men: some require the whole head or most of it, others accept part of it.",
        es: "Los sabios difieren sobre el recorte mínimo para el hombre: algunos exigen toda la cabeza o la mayor parte, otros aceptan una parte.",
      },
    ],
    duaIds: ["halq-dua"],
    videoIds: [],
    sourceIds: ["quran-48-27", "bukhari-1727", "muslim-1301", "abudawud-1985"],
    focus: {
      ar: "الرجل: حلق أو تقصير لكل الرأس. المرأة: قدر أنملة.",
      fr: "Homme : rasage ou raccourcissement de toute la tête. Femme : une phalange.",
      en: "Men: shave or shorten the whole head. Women: a fingertip's length.",
      es: "Hombre: rapado o recorte de toda la cabeza. Mujer: una falange.",
    },
  },
  {
    id: "completion",
    order: 9,
    arabicName: "تمام العمرة",
    title: {
      ar: "تمام العمرة",
      fr: "Fin de la Omra",
      en: "Completing Umrah",
      es: "Fin de la Umrah",
    },
    summary: {
      ar: "تمّت عمرتك بحمد الله. احمد الله، وأكثر من الدعاء، واحرص على الاستقامة بعدها.",
      fr: "Votre Omra est accomplie, louange à Allah. Remerciez-Le, multipliez les invocations et restez constant dans le bien.",
      en: "Your Umrah is complete, praise be to Allah. Thank Him, supplicate abundantly and remain steadfast in goodness.",
      es: "Tu Umrah está completa, alabado sea Allah. Agradécele, suplica abundantemente y mantente constante en el bien.",
    },
    whatToDo: [
      {
        text: {
          ar: "احمد الله على التوفيق، واسأله القبول.",
          fr: "Louez Allah de vous avoir permis d'accomplir la Omra et demandez-Lui de l'accepter.",
          en: "Praise Allah for enabling you and ask Him to accept it.",
          es: "Alaba a Allah por haberte permitido realizarla y pídele que la acepte.",
        },
      },
      {
        text: {
          ar: "قل دعاء الخروج من المسجد عند خروجك.",
          fr: "Dites l'invocation de sortie de la mosquée en partant.",
          en: "Say the supplication for leaving the mosque when you leave.",
          es: "Di la súplica de salida de la mezquita al salir.",
        },
        ruling: "sunnah",
        sourceIds: ["muslim-713"],
      },
      {
        text: {
          ar: "اغتنم وقتك في مكة بالصلاة في المسجد الحرام والطواف تطوّعًا.",
          fr: "Profitez de votre séjour pour prier à Masjid al-Haram et faire des Tawaf surérogatoires.",
          en: "Make use of your stay by praying at Masjid al-Haram and performing voluntary Tawaf.",
          es: "Aprovecha tu estancia para rezar en Masyid al-Haram y hacer Tawaf voluntarios.",
        },
        ruling: "optional",
      },
    ],
    howTo: [
      {
        ar: "زيارة المسجد النبوي في المدينة مشروعة في أي وقت، وليست من أعمال العمرة ولا شرطًا لها.",
        fr: "La visite de Masjid an-Nabawi à Médine est recommandée à tout moment, mais elle ne fait pas partie des rites de la Omra et n'en est pas une condition.",
        en: "Visiting Masjid an-Nabawi in Madinah is recommended at any time, but it is not part of the Umrah rites nor a condition for it.",
        es: "La visita a Masyid an-Nabawi en Medina es recomendable en cualquier momento, pero no forma parte de los ritos de la Umrah ni es condición para ella.",
      },
    ],
    mistakes: [
      {
        ar: "الاعتقاد بأن زيارة المواقع التاريخية من أعمال العمرة.",
        fr: "Croire que la visite des sites historiques fait partie des rites de la Omra.",
        en: "Believing that visiting historical sites is part of the Umrah rites.",
        es: "Creer que visitar los lugares históricos forma parte de los ritos de la Umrah.",
      },
    ],
    duaIds: ["exit-mosque", "rabbana-taqabbal"],
    videoIds: [],
    sourceIds: ["muslim-713", "quran-2-127", "bukhari-1189"],
    focus: {
      ar: "تمّت عمرتك. احمد الله واسأله القبول.",
      fr: "Votre Omra est terminée. Louez Allah et demandez l'acceptation.",
      en: "Your Umrah is complete. Praise Allah and ask for acceptance.",
      es: "Tu Umrah ha terminado. Alaba a Allah y pide la aceptación.",
    },
  },
];

export const stepsById: ReadonlyMap<string, UmrahStep> = new Map(steps.map((s) => [s.id, s]));
