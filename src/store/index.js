import { configureStore } from '@reduxjs/toolkit';
import referralReducer from './slices/referralSlice';
import careersReducer from './slices/careersSlice';
import telemedicineReducer from './slices/telemedicineSlice';
import blogReducer from './slices/blogSlice';

// Enhanced localStorage handling with error protection
const getLocalStorageData = (key, defaultValue) => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Initialize state with safe localStorage access
const preloadedState = {
  referral: {
    referrals: getLocalStorageData('referrals', []),
    schedules: getLocalStorageData('schedules', referralReducer(undefined, {}).schedules)
  },
  careers: {
    jobs: getLocalStorageData('careersJobs', [
      {
        id: '1',
        title: "Senior Cardiologist",
        department: "Cardiology",
        location: "Main Medical Center",
        type: "Full-time",
        experience: "5+ years",
        description: "Looking for an experienced cardiologist to join our heart center team...",
        requirements: [
          "Board certification in Cardiology",
          "5+ years of clinical experience",
          "Strong research background",
          "Excellent patient care skills"
        ],
        postedDate: new Date().toISOString().split('T')[0]
      },
      {
        id: '2',
        title: "Pediatric Specialist",
        department: "Pediatrics",
        location: "Children's Wing",
        type: "Full-time",
        experience: "3+ years",
        description: "Seeking a dedicated pediatric specialist to provide comprehensive care...",
        requirements: [
          "Board certification in Pediatrics",
          "3+ years of pediatric experience",
          "Strong communication skills",
          "Experience with complex cases"
        ],
        postedDate: new Date().toISOString().split('T')[0]
      }
    ]),
    applications: getLocalStorageData('careersApplications', []),
    error: null
  },
  telemedicine: {
    ...telemedicineReducer(undefined, {})
  },
  blog: {
    posts: getLocalStorageData('blogPosts', [
      {
        id: 'pph-article-2026',
        title: 'The Silent Flood: Confronting the Global Scourge of Postpartum Haemorrhage',
        excerpt: 'Postpartum haemorrhage remains the leading direct cause of maternal mortality worldwide. Dr. Nuwamanya Lilian explores this critical health emergency and the path to prevention.',
        category: 'Maternal Health',
        image: '/images/Dr.Nuwamanya-Lilian.jpg',
        content: `Within the profound journey of childbirth, a silent and ferocious emergency lurks, capable of extinguishing a mother's light in the very moment she brings forth new life. Postpartum haemorrhage (PPH)—defined as a blood loss of 500 ml or more within 24 hours of birth—remains the leading direct cause of maternal mortality worldwide. It is a condition that epitomises the stark inequities in global healthcare, where geography and resource allocation often determine life or death.

## The Stark Numerical Reality

To comprehend the magnitude of this crisis, one must engage with the sobering statistics. According to the latest World Health Organization (WHO) data, approximately 14 million women experience PPH annually, resulting in around 70,000 maternal deaths each year—a devastating figure representing nearly one-quarter of all maternal mortalities globally. The disparity is chilling: a woman in sub-Saharan Africa is over 100 times more likely to die from a pregnancy-related complication than a woman in a high-income country, with PPH being a primary driver of this chasm. Furthermore, for every woman who dies, an estimated 20 more suffer from severe morbidity, including shock, organ failure, and Sheehan's syndrome, with lifelong consequences.

## Aetiology and the "Four T's"

Clinical management hinges on rapid identification of the cause, classically remembered as the "Four T's":

**Tone (Uterine Atony):** The commonest cause, accounting for 70-80% of cases, where the uterus fails to contract effectively after delivery.

**Trauma:** Lacerations of the genital tract, cervix, or uterus.

**Tissue:** Retention of placental fragments or abnormal placentation.

**Thrombin:** Pre-existing or acquired coagulopathies.

Understanding this framework is not merely academic; it is the blueprint for urgent intervention. Uterine atony, in particular, is a critical target for prevention and first-line treatment.

## Risk Factors and the Preventative Paradigm

While PPH can occur without warning, several factors elevate risk: prolonged labour, multiparity, multiple pregnancy, fetal macrosomia, and previous PPH history. However, the most pivotal modern insight is that most PPH-related deaths are preventable with timely, evidence-based care. The cornerstone of prevention is the Active Management of the Third Stage of Labour (AMTSL), which includes prophylactic uterotonics (ideally oxytocin), controlled cord traction, and uterine massage. The WHO states unequivocally that AMTSL reduces the risk of PPH by approximately 60%. Yet, implementation rates remain inconsistent, especially in low-resource settings where skilled birth attendance is not guaranteed.

## Management: A Race Against Time

When prevention fails, a structured, protocol-driven response is paramount. The medical arsenal begins with first-line uterotonics. Oxytocin remains the gold standard, but where refrigeration for its storage is a challenge—a stark reality in many communities I serve—heat-stable carbetocin offers a promising alternative, shown to be non-inferior to oxytocin in preventing PPH.

The landmark WOMAN Trial revolutionised second-line treatment, demonstrating that the early administration of tranexamic acid reduces death due to bleeding by 19% if given within three hours of birth, with no increase in thrombotic events. This finding must be translated into universal availability at the most peripheral health units.

Should pharmacological management prove insufficient, escalating to mechanical and surgical interventions—from balloon tamponade to compressive sutures and, ultimately, hysterectomy—becomes necessary. This escalation pathway underscores the non-negotiable need for skilled personnel, functional blood transfusion services, and timely referral systems—the very infrastructure that is often weakest where the burden is highest.

## A Call for Equitable Action

The fight against PPH is a litmus test for global commitment to maternal health. It demands a multi-faceted approach: strengthening health systems, ensuring universal access to quality antenatal care and skilled birth attendants, innovating in heat-stable and affordable uterotonics, and implementing robust PPH management protocols at every delivery point.

As a general practitioner with Specialist Doctors International, working at the coalface of this emergency, I witness both the tragedy and the triumph. The death of a mother from PPH is a catastrophic systems failure. Conversely, every life saved through prompt, competent intervention is a testament to what is possible. The statistics are not merely numbers; they represent mothers, families, and communities. We possess the knowledge and the tools to turn the tide on this silent flood. What we require now is the unwavering political will and equitable resource allocation to ensure that no woman, regardless of her birthplace, bleeds to death giving life.

---

*By Dr. Nuwamanya Lilian, General Practitioner, Specialist Doctors International*`,
        date: 'February 8, 2026',
        author: 'Dr. Nuwamanya Lilian',
        createdAt: '2026-02-08T12:00:00.000Z',
        updatedAt: '2026-02-08T12:00:00.000Z'
      }
    ]),
    loading: false,
    error: null
  }
};

export const store = configureStore({
  reducer: {
    referral: referralReducer,
    careers: careersReducer,
    telemedicine: telemedicineReducer,
    blog: blogReducer
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.timestamp', 'payload.error'],
        ignoredPaths: [
          'referral.schedules',
          'telemedicine.someNonSerializableField',
          'blog.posts.image',
          'careers.jobs.requirements' // If requirements contain non-serializable data
        ]
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

// Subscribe to store changes for persistence
store.subscribe(() => {
  try {
    const { referral, careers, blog } = store.getState();
    
    // Persist referral data
    localStorage.setItem('referrals', JSON.stringify(referral.referrals));
    localStorage.setItem('schedules', JSON.stringify(referral.schedules));
    
    // Persist careers data
    localStorage.setItem('careersJobs', JSON.stringify(careers.jobs));
    localStorage.setItem('careersApplications', JSON.stringify(careers.applications));
    
    // Persist blog posts
    localStorage.setItem('blogPosts', JSON.stringify(blog.posts));
  } catch (error) {
    console.error('Error persisting state to localStorage:', error);
  }
});

export default store;