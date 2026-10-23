import React, { useState } from 'react';
import { 
  Dumbbell, 
  RotateCcw, 
  Flame, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  MessageCircle, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Award,
  Calendar,
  Zap
} from 'lucide-react';
import { useModal } from '../context';

// Comprehensive database of structured workout routines
function generateWorkoutPlan({ goal, level, equipment, days }) {
  const goalTitles = {
    fat: 'Fat Loss & High-Energy Shred',
    muscle: 'Hypertrophy & Lean Muscle Builder',
    strength: 'Maximal Strength & Powerlifting Base',
    fit: 'Athletic Conditioning & Functional Mobility',
  };

  const splitNames = {
    3: '3-Day Full Body Progression Split',
    4: '4-Day Upper / Lower Power Split',
    5: '5-Day Push / Pull / Legs + Upper / Lower Split',
  };

  // 3-Day Full Body Splits
  if (+days === 3) {
    if (equipment === 'gym') {
      return {
        title: `${goalTitles[goal]} — ${splitNames[3]}`,
        summary: 'Target every major muscle group 3x per week with high recovery intervals. Ideal for busy schedules.',
        schedule: 'Monday (Day 1), Wednesday (Day 2), Friday (Day 3), Weekends (Active Recovery & 10k Steps)',
        days: [
          {
            name: 'Day 1: Full Body Foundation (A)',
            focus: 'Chest, Quads, Back & Core',
            exercises: [
              { name: 'Barbell Back Squats', sets: '3 sets', reps: level === 'beginner' ? '8-10 reps' : '6-8 reps', rest: '90-120s', cue: 'Drive through mid-foot, hit parallel depth.' },
              { name: 'Barbell Flat Bench Press', sets: '3 sets', reps: '8-10 reps', rest: '90s', cue: 'Tuck shoulder blades into bench, controlled descent.' },
              { name: 'Chest Supported Cable Rows', sets: '3 sets', reps: '10-12 reps', rest: '60s', cue: 'Squeeze shoulder blades together for 1s at peak contraction.' },
              { name: 'Dumbbell Romanian Deadlifts', sets: '3 sets', reps: '10-12 reps', rest: '90s', cue: 'Push hips backward, keep slight knee bend, flat spine.' },
              { name: 'Standing Dumbbell Lateral Raises', sets: '3 sets', reps: '12-15 reps', rest: '60s', cue: 'Lead with elbows, keep tension on side delts.' },
              { name: 'Hanging Knee Raises / Planks', sets: '3 sets', reps: '12-15 reps / 45s', rest: '45s', cue: 'Posterior pelvic tilt, avoid swinging.' },
            ],
          },
          {
            name: 'Day 2: Full Body Posterior & Push (B)',
            focus: 'Hamstrings, Shoulders, Lats & Arms',
            exercises: [
              { name: 'Conventional / Trap Bar Deadlifts', sets: '3 sets', reps: level === 'beginner' ? '6-8 reps' : '5 reps', rest: '120s', cue: 'Brace core hard, pull slack out of the bar before lift.' },
              { name: 'Overhead Barbell / Dumbbell Press', sets: '3 sets', reps: '8-10 reps', rest: '90s', cue: 'Squeeze glutes, push head through at top.' },
              { name: 'Lat Pulldowns (Wide / Neutral Grip)', sets: '3 sets', reps: '10-12 reps', rest: '60s', cue: 'Pull elbows down toward your hips, full lat stretch at top.' },
              { name: 'Bulgarian Split Squats (Dumbbells)', sets: '3 sets / leg', reps: '8-10 reps', rest: '60s', cue: 'Keep torso upright or slightly leaning forward for quad/glute.' },
              { name: 'Incline Dumbbell Bicep Curls', sets: '3 sets', reps: '10-12 reps', rest: '45s', cue: 'Full elbow extension and contraction at top.' },
              { name: 'Rope Tricep Cable Pushdowns', sets: '3 sets', reps: '12-15 reps', rest: '45s', cue: 'Flare rope outward at bottom, hold 1s.' },
            ],
          },
          {
            name: 'Day 3: Full Body Hypertrophy (C)',
            focus: 'Total Body Metabolic Pump & Joint Health',
            exercises: [
              { name: 'Leg Press (Moderate Stance)', sets: '3 sets', reps: '10-12 reps', rest: '90s', cue: 'Smooth 3-second eccentric tempo.' },
              { name: 'Incline Dumbbell Bench Press', sets: '3 sets', reps: '10-12 reps', rest: '90s', cue: 'Upper chest focus, 30-degree incline.' },
              { name: 'Seated Cable Row / Face Pulls', sets: '3 sets', reps: '12-15 reps', rest: '60s', cue: 'Great for rear delts and rotator cuff posture.' },
              { name: 'Hamstring Lying Leg Curls', sets: '3 sets', reps: '12-15 reps', rest: '60s', cue: 'Toes dorsiflexed, controlled lower.' },
              { name: 'Dumbbell Hammer Curls + Dips Superset', sets: '3 sets', reps: '10-12 reps', rest: '60s', cue: 'Forearm and tricep conditioning.' },
              { name: 'Cable Woodchoppers / Ab Wheel', sets: '3 sets', reps: '12-15 reps', rest: '45s', cue: 'Rotational core stability.' },
            ],
          },
        ],
      };
    } else if (equipment === 'dumbbells') {
      return {
        title: `${goalTitles[goal]} — 3-Day Home Dumbbell Split`,
        summary: 'Targeted high-efficiency dumbbell workouts designed to be done anywhere with adjustable dumbbells.',
        schedule: 'Monday, Wednesday, Friday with 48 hours recovery between workouts',
        days: [
          {
            name: 'Day 1: Dumbbell Full Body (A)',
            focus: 'Quads, Chest, Back & Core',
            exercises: [
              { name: 'Goblet Squats (Heavy Dumbbell)', sets: '4 sets', reps: '10-12 reps', rest: '60s', cue: 'Hold dumbbell vertically at chest, sit deep.' },
              { name: 'Floor Dumbbell Press / Push-ups', sets: '4 sets', reps: '10-12 reps', rest: '60s', cue: 'Press up with chest squeeze, pause on floor.' },
              { name: 'Single-Arm Dumbbell Rows', sets: '3 sets / arm', reps: '10-12 reps', rest: '60s', cue: 'Pull toward hip pocket, keep back flat.' },
              { name: 'Dumbbell Romanian Deadlifts', sets: '3 sets', reps: '12 reps', rest: '60s', cue: 'Feel hamstrings stretch, squeeze glutes at top.' },
              { name: 'Standing Dumbbell Shoulder Press', sets: '3 sets', reps: '10-12 reps', rest: '60s', cue: 'Tight core, press directly overhead.' },
              { name: 'Plank Shoulder Taps', sets: '3 sets', reps: '20 taps', rest: '45s', cue: 'Prevent hips from swaying.' },
            ],
          },
          {
            name: 'Day 2: Dumbbell Full Body (B)',
            focus: 'Hamstrings, Lats, Shoulders & Arms',
            exercises: [
              { name: 'Dumbbell Walking Lunges', sets: '3 sets', reps: '12 steps / leg', rest: '60s', cue: 'Keep front shin vertical, 90-degree bend.' },
              { name: 'Bent-Over Dumbbell Two-Arm Rows', sets: '4 sets', reps: '10-12 reps', rest: '60s', cue: 'Hinge at hips, pull elbows high.' },
              { name: 'Dumbbell Incline or Floor Flyes', sets: '3 sets', reps: '12-15 reps', rest: '45s', cue: 'Slight elbow bend, stretch chest safely.' },
              { name: 'Dumbbell Lateral Raises', sets: '4 sets', reps: '12-15 reps', rest: '45s', cue: 'Controlled tempo, do not swing torso.' },
              { name: 'Dumbbell Hammer Curls', sets: '3 sets', reps: '12 reps', rest: '45s', cue: 'Palms facing each other, builds arms and grip.' },
              { name: 'Overhead Dumbbell Tricep Extension', sets: '3 sets', reps: '12 reps', rest: '45s', cue: 'Keep elbows tucked near ears.' },
            ],
          },
          {
            name: 'Day 3: Dumbbell Full Body (C)',
            focus: 'Explosive Power, Conditioning & Core',
            exercises: [
              { name: 'Dumbbell Sumo Deadlift Squats', sets: '4 sets', reps: '12 reps', rest: '60s', cue: 'Wide stance, targets inner thighs and glutes.' },
              { name: 'Push-up to Renegade Row', sets: '3 sets', reps: '8-10 reps', rest: '60s', cue: 'One push-up followed by row on each arm.' },
              { name: 'Dumbbell Thrusters (Squat to Press)', sets: '3 sets', reps: '10-12 reps', rest: '60s', cue: 'Drive up explosively from squat into press.' },
              { name: 'Dumbbell Rear Delt Flyes', sets: '3 sets', reps: '15 reps', rest: '45s', cue: 'Strengthens upper back and improves posture.' },
              { name: 'Lying Leg Raises / Bicycle Crunches', sets: '3 sets', reps: '20 reps', rest: '45s', cue: 'Controlled breathing, lower back flat.' },
            ],
          },
        ],
      };
    } else {
      // Bodyweight Only 3 Days
      return {
        title: `${goalTitles[goal]} — 3-Day Calisthenics & Bodyweight Split`,
        summary: 'Zero equipment needed. Uses progressive bodyweight mechanics, leverage, and time-under-tension.',
        schedule: 'Monday, Wednesday, Friday (30-40 mins per session)',
        days: [
          {
            name: 'Day 1: Bodyweight Push & Legs Focus',
            focus: 'Chest, Shoulders, Quads & Core',
            exercises: [
              { name: 'Standard Push-ups (or Incline Push-ups)', sets: '4 sets', reps: level === 'beginner' ? '8-10 reps' : '15-20 reps', rest: '60s', cue: 'Elbows at 45 degrees, chest touches floor.' },
              { name: 'Bodyweight Squats (Tempo 3-1-1)', sets: '4 sets', reps: '15-20 reps', rest: '60s', cue: '3 seconds on way down, pause 1s at bottom.' },
              { name: 'Pike Push-ups (Shoulders)', sets: '3 sets', reps: '8-12 reps', rest: '60s', cue: 'Hips high in V-shape, lower head between hands.' },
              { name: 'Walking Lunges', sets: '3 sets', reps: '12 steps / leg', rest: '60s', cue: 'Chest upright, knee gently touches floor.' },
              { name: 'Bench / Chair Tricep Dips', sets: '3 sets', reps: '12-15 reps', rest: '45s', cue: 'Keep back close to the chair edge.' },
              { name: 'Front Plank Hold', sets: '3 sets', reps: '45-60s hold', rest: '45s', cue: 'Glutes squeezed, belly button pulled into spine.' },
            ],
          },
          {
            name: 'Day 2: Posterior Chain & Pull Strength',
            focus: 'Back, Hamstrings, Glutes & Obliques',
            exercises: [
              { name: 'Doorframe / Towel Isometric Rows', sets: '4 sets', reps: '12-15 reps', rest: '60s', cue: 'Squeeze shoulder blades hard for 2 seconds.' },
              { name: 'Single-Leg Glute Bridges', sets: '3 sets / leg', reps: '12-15 reps', rest: '45s', cue: 'Drive through heel, lock out hip.' },
              { name: 'Prone Cobra / Superman Holds', sets: '3 sets', reps: '12 reps (3s hold)', rest: '45s', cue: 'Lift chest and thighs off floor, squeeze upper back.' },
              { name: 'Reverse Lunges', sets: '3 sets / leg', reps: '12 reps', rest: '60s', cue: 'Gentle on knees, great for glute drive.' },
              { name: 'Diamond / Close Grip Push-ups', sets: '3 sets', reps: '8-12 reps', rest: '60s', cue: 'Focus on triceps and inner chest.' },
              { name: 'Side Plank Holds', sets: '3 sets / side', reps: '30-45s hold', rest: '45s', cue: 'Straight line from shoulder to ankle.' },
            ],
          },
          {
            name: 'Day 3: Full Body Conditioning & Core Blast',
            focus: 'Metabolic Fat Burn & Endurance',
            exercises: [
              { name: 'Burpees (No Jump for Beginners)', sets: '3 sets', reps: '10-12 reps', rest: '60s', cue: 'Smooth rhythm, stay light on feet.' },
              { name: 'Jump Squats (or Fast Air Squats)', sets: '3 sets', reps: '12-15 reps', rest: '60s', cue: 'Land softly on balls of feet.' },
              { name: 'Mountain Climbers', sets: '3 sets', reps: '30s fast', rest: '45s', cue: 'Keep hips down, knees driven toward chest.' },
              { name: 'Decline / Incline Push-up Variations', sets: '3 sets', reps: '10-12 reps', rest: '60s', cue: 'Feet elevated on sofa or hands on table.' },
              { name: 'Dead Bug Exercise', sets: '3 sets', reps: '12 reps / side', rest: '45s', cue: 'Lower back pinned to floor throughout.' },
            ],
          },
        ],
      };
    }
  }

  // 4-Day Upper / Lower Power Splits
  if (+days === 4) {
    return {
      title: `${goalTitles[goal]} — ${splitNames[4]}`,
      summary: 'The gold standard bodybuilding & strength split: Upper Body twice a week, Lower Body twice a week.',
      schedule: 'Mon (Upper 1), Tue (Lower 1), Wed (Rest), Thu (Upper 2), Fri (Lower 2), Sat-Sun (Rest/Walks)',
      days: [
        {
          name: 'Day 1: Upper Body Power (A)',
          focus: 'Chest, Upper Back, Delts & Arms',
          exercises: [
            { name: 'Barbell / Dumbbell Flat Bench Press', sets: '4 sets', reps: '6-8 reps', rest: '90-120s', cue: 'Heavy compound, controlled 2-second descent.' },
            { name: 'Barbell Bent-Over Row / T-Bar Row', sets: '4 sets', reps: '6-8 reps', rest: '90s', cue: 'Strict back angle, pull with elbows.' },
            { name: 'Seated Dumbbell Shoulder Press', sets: '3 sets', reps: '8-10 reps', rest: '90s', cue: 'Press overhead in smooth arc.' },
            { name: 'Close-Grip Lat Pulldown', sets: '3 sets', reps: '10-12 reps', rest: '60s', cue: 'Great lat stretch, elbows driven down.' },
            { name: 'Dumbbell Hammer Curls', sets: '3 sets', reps: '10-12 reps', rest: '45s', cue: 'Focus on brachialis and forearm thickness.' },
            { name: 'Overhead Cable Tricep Extension', sets: '3 sets', reps: '12-15 reps', rest: '45s', cue: 'Long head tricep stretch.' },
          ],
        },
        {
          name: 'Day 2: Lower Body Power (A)',
          focus: 'Quads, Hamstrings, Calves & Abs',
          exercises: [
            { name: 'Barbell Back Squats / Hack Squats', sets: '4 sets', reps: '6-8 reps', rest: '120s', cue: 'Brace core with deep diaphragmatic breath.' },
            { name: 'Romanian Deadlifts (Barbell or DB)', sets: '4 sets', reps: '8-10 reps', rest: '90s', cue: 'Feel deep hamstring stretch, hips hinge back.' },
            { name: 'Bulgarian Split Squats', sets: '3 sets / leg', reps: '8-10 reps', rest: '60s', cue: 'Unilateral quad and glute balance.' },
            { name: 'Lying or Seated Hamstring Curls', sets: '3 sets', reps: '10-12 reps', rest: '60s', cue: 'Slow 3-second negative.' },
            { name: 'Standing Calf Raises', sets: '4 sets', reps: '12-15 reps', rest: '45s', cue: 'Full 1-second pause at bottom stretch.' },
            { name: 'Hanging Leg Raises / Captains Chair', sets: '3 sets', reps: '12-15 reps', rest: '45s', cue: 'Curling pelvis upward, avoiding momentum.' },
          ],
        },
        {
          name: 'Day 3: Upper Body Hypertrophy (B)',
          focus: 'Incline Chest, Lats, Side Delts & Arms Pump',
          exercises: [
            { name: 'Incline Dumbbell Bench Press', sets: '4 sets', reps: '8-10 reps', rest: '90s', cue: 'Targets clavicular upper chest fibres.' },
            { name: 'Chest-Supported Cable / Machine Row', sets: '4 sets', reps: '10-12 reps', rest: '60s', cue: 'Protects lower back, pure mid-back squeeze.' },
            { name: 'Dumbbell / Cable Lateral Raises', sets: '4 sets', reps: '12-15 reps', rest: '45s', cue: 'The key exercise for wide shoulder aesthetic.' },
            { name: 'Cable Chest Flyes / Pec Deck', sets: '3 sets', reps: '12-15 reps', rest: '45s', cue: 'Maximum inner chest squeeze at peak.' },
            { name: 'Incline Dumbbell Bicep Curls', sets: '3 sets', reps: '10-12 reps', rest: '45s', cue: 'Full biceps stretch behind torso.' },
            { name: 'Straight Bar Cable Tricep Pushdowns', sets: '3 sets', reps: '12-15 reps', rest: '45s', cue: 'Lock out elbows with purpose.' },
          ],
        },
        {
          name: 'Day 4: Lower Body & Posterior (B)',
          focus: 'Deadlifts, Hamstrings, Glutes & Core',
          exercises: [
            { name: 'Conventional Deadlift / Trap Bar Deadlift', sets: '3 sets', reps: '5-6 reps', rest: '120s', cue: 'Full body tension, drive earth away.' },
            { name: 'Leg Press (High & Wide Footing)', sets: '4 sets', reps: '10-12 reps', rest: '90s', cue: 'Glute and hamstring emphasis.' },
            { name: 'Leg Extensions (Quads)', sets: '3 sets', reps: '12-15 reps', rest: '60s', cue: 'Hold 1s at top lockout.' },
            { name: 'Dumbbell Walking Lunges', sets: '3 sets', reps: '10 steps / leg', rest: '60s', cue: 'High burn finisher.' },
            { name: 'Seated Calf Raises', sets: '4 sets', reps: '15 reps', rest: '45s', cue: 'Soleus muscle development.' },
            { name: 'Cable Woodchopper / Abdominal Planks', sets: '3 sets', reps: '15 reps / 60s', rest: '45s', cue: 'Rotational core power.' },
          ],
        },
      ],
    };
  }

  // 5-Day Push / Pull / Legs + Upper / Lower Split
  return {
    title: `${goalTitles[goal]} — ${splitNames[5]}`,
    summary: 'High frequency, elite physique split. Gives optimal muscle stimulation with targeted volume per session.',
    schedule: 'Mon (Push), Tue (Pull), Wed (Legs), Thu (Rest), Fri (Upper), Sat (Lower), Sun (Rest)',
    days: [
      {
        name: 'Day 1: Push (Chest, Shoulders & Triceps)',
        focus: 'Pressing Movements & Front/Side Delts',
        exercises: [
          { name: 'Barbell Flat Bench Press', sets: '4 sets', reps: '6-8 reps', rest: '90-120s', cue: 'Controlled descent, explode up.' },
          { name: 'Incline Dumbbell Press', sets: '3 sets', reps: '8-10 reps', rest: '90s', cue: '30-degree incline, deep stretch.' },
          { name: 'Dumbbell Overhead Shoulder Press', sets: '3 sets', reps: '8-10 reps', rest: '90s', cue: 'Smooth overhead drive.' },
          { name: 'Cable Lateral Raises', sets: '4 sets', reps: '12-15 reps', rest: '45s', cue: 'Constant lateral tension.' },
          { name: 'Rope Tricep Pushdowns', sets: '3 sets', reps: '12-15 reps', rest: '45s', cue: 'Spread rope at bottom.' },
        ],
      },
      {
        name: 'Day 2: Pull (Back, Rear Delts & Biceps)',
        focus: 'Vertical & Horizontal Pulls',
        exercises: [
          { name: 'Barbell Bent-Over Row', sets: '4 sets', reps: '6-8 reps', rest: '90s', cue: 'Pull toward belly button.' },
          { name: 'Lat Pulldowns or Weighted Pull-ups', sets: '4 sets', reps: '8-10 reps', rest: '90s', cue: 'Full range of motion, lat squeeze.' },
          { name: 'Seated Cable Row (Neutral Grip)', sets: '3 sets', reps: '10-12 reps', rest: '60s', cue: 'Thick middle back focus.' },
          { name: 'Face Pulls (Rope Cable)', sets: '4 sets', reps: '15 reps', rest: '45s', cue: 'Rotate hands back, saves shoulders.' },
          { name: 'Barbell / EZ-Bar Bicep Curls', sets: '3 sets', reps: '10-12 reps', rest: '45s', cue: 'Pin elbows to ribs.' },
        ],
      },
      {
        name: 'Day 3: Legs (Quads, Hamstrings & Calves)',
        focus: 'Lower Body Compound Strength',
        exercises: [
          { name: 'Barbell Back Squats', sets: '4 sets', reps: '6-8 reps', rest: '120s', cue: 'Solid brace, drive out of the hole.' },
          { name: 'Dumbbell Romanian Deadlifts', sets: '4 sets', reps: '8-10 reps', rest: '90s', cue: 'Hips back, hamstring stretch.' },
          { name: 'Leg Press (Quad Focus)', sets: '3 sets', reps: '10-12 reps', rest: '90s', cue: 'Controlled eccentric.' },
          { name: 'Lying Leg Curls', sets: '3 sets', reps: '12-15 reps', rest: '60s', cue: 'Isolate hamstrings.' },
          { name: 'Standing Calf Raises', sets: '4 sets', reps: '15 reps', rest: '45s', cue: 'Hold peak contraction.' },
        ],
      },
      {
        name: 'Day 4: Upper Body Hypertrophy',
        focus: 'Sculpting & Volume Pump',
        exercises: [
          { name: 'Dumbbell Incline Bench Press', sets: '4 sets', reps: '8-10 reps', rest: '90s', cue: 'Upper chest development.' },
          { name: 'Chest-Supported Row', sets: '4 sets', reps: '10-12 reps', rest: '60s', cue: 'Upper back width.' },
          { name: 'Dumbbell Lateral Raises (Drop-set on last set)', sets: '4 sets', reps: '12-15 reps', rest: '45s', cue: 'Maximum shoulder pump.' },
          { name: 'Incline Dumbbell Curls + Skullcrushers', sets: '3 sets', reps: '10-12 reps', rest: '60s', cue: 'Arm superset.' },
          { name: 'Hanging Leg Raises', sets: '3 sets', reps: '15 reps', rest: '45s', cue: 'Core definition.' },
        ],
      },
      {
        name: 'Day 5: Lower Body & Core Power',
        focus: 'Glutes, Hamstrings & Core Stability',
        exercises: [
          { name: 'Trap Bar or Barbell Deadlifts', sets: '3 sets', reps: '5-6 reps', rest: '120s', cue: 'Pure posterior chain power.' },
          { name: 'Bulgarian Split Squats', sets: '3 sets / leg', reps: '8-10 reps', rest: '60s', cue: 'Single-leg strength.' },
          { name: 'Leg Extensions', sets: '3 sets', reps: '12-15 reps', rest: '60s', cue: 'Quad teardrop definition.' },
          { name: 'Seated Hamstring Curls', sets: '3 sets', reps: '12-15 reps', rest: '60s', cue: 'Controlled squeeze.' },
          { name: 'Ab Wheel Rollouts / Cable Crunches', sets: '3 sets', reps: '12-15 reps', rest: '45s', cue: 'Deep core compression.' },
        ],
      },
    ],
  };
}

export default function WorkoutTool() {
  const { open } = useModal();
  const [f, setF] = useState({
    goal: 'fat',
    level: 'beginner',
    equipment: 'gym',
    days: '4',
  });
  const [plan, setPlan] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e) => {
    e?.preventDefault();
    setPlan(generateWorkoutPlan(f));
  };

  const handleCopyRoutine = () => {
    if (!plan) return;
    const text = [
      `🏋️‍♂️ TRAINXSHIV FREE WORKOUT ROUTINE 🏋️‍♂️`,
      `${plan.title}`,
      `Schedule: ${plan.schedule}`,
      `Summary: ${plan.summary}`,
      `-----------------------------------------`,
      ...plan.days.map((d) => 
        `📌 ${d.name} (${d.focus}):\n` +
        d.exercises.map((ex, i) => `  ${i + 1}. ${ex.name} — ${ex.sets} × ${ex.reps} (Rest: ${ex.rest}) | Cue: ${ex.cue}`).join('\n')
      ),
      `-----------------------------------------`,
      `🔥 Master Coach Shivam's Golden Rules:`,
      `1. Log every weight lifted. Add 1 rep or 1-2 kg once you hit top rep range.`,
      `2. Keep 1-2 Reps in Reserve (RIR) on all sets. Do not train to sloppy failure.`,
      `3. For personalized video form analysis with Coach Shivam, visit: https://trainxshiv.com`,
    ].join('\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const waWorkoutLink = `https://wa.me/917080263878?text=${encodeURIComponent(
    `Hi Coach Shivam! I generated my free workout routine on TrainXShiv:\n- Routine: ${plan?.title || 'Custom Split'}\n- Experience: ${f.level}\n- Equipment: ${f.equipment}\n- Days: ${f.days} days/week\n\nI want to send my workout form video for a free review and discuss 1-on-1 coaching!`
  )}`;

  return (
    <div className="workout-tool-wrapper">
      {!plan ? (
        <form className="workout-generator-form" onSubmit={handleGenerate}>
          {/* Goal Selector */}
          <div className="wt-field-group">
            <label className="wt-field-label">1. Select Your Fitness Goal</label>
            <div className="wt-options-grid g4">
              {[
                { id: 'fat', label: 'Fat Loss & Shred', icon: Flame, desc: 'High metabolic burn & tone' },
                { id: 'muscle', label: 'Muscle Gain (Hypertrophy)', icon: Dumbbell, desc: 'Maximize lean muscle size' },
                { id: 'strength', label: 'Strength & Power', icon: Target, desc: 'Heavy lifts & progressive PRs' },
                { id: 'fit', label: 'Functional Fitness', icon: Zap, desc: 'Mobility, stamina & stamina' },
              ].map((item) => {
                const IconC = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`wt-option-card ${f.goal === item.id ? 'active' : ''}`}
                    onClick={() => setF({ ...f, goal: item.id })}
                  >
                    <IconC size={20} className="wt-option-icon" />
                    <strong>{item.label}</strong>
                    <small>{item.desc}</small>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level & Equipment in 2 Columns */}
          <div className="grid g2 wt-row-group">
            {/* Experience Level */}
            <div className="wt-field-group">
              <label className="wt-field-label">2. Your Experience Level</label>
              <div className="wt-options-grid g3">
                {[
                  { id: 'beginner', label: 'Beginner', sub: '0-6 Mos' },
                  { id: 'intermediate', label: 'Intermediate', sub: '6-24 Mos' },
                  { id: 'advanced', label: 'Advanced', sub: '2+ Yrs' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`wt-chip-btn ${f.level === item.id ? 'active' : ''}`}
                    onClick={() => setF({ ...f, level: item.id })}
                  >
                    <span>{item.label}</span>
                    <small>{item.sub}</small>
                  </button>
                ))}
              </div>
            </div>

            {/* Workout Location & Equipment */}
            <div className="wt-field-group">
              <label className="wt-field-label">3. Location &amp; Equipment</label>
              <div className="wt-options-grid g3">
                {[
                  { id: 'gym', label: 'Full Gym', sub: 'Commercial' },
                  { id: 'dumbbells', label: 'Dumbbells', sub: 'Home / Bands' },
                  { id: 'bodyweight', label: 'Bodyweight', sub: 'No Equipment' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`wt-chip-btn ${f.equipment === item.id ? 'active' : ''}`}
                    onClick={() => setF({ ...f, equipment: item.id })}
                  >
                    <span>{item.label}</span>
                    <small>{item.sub}</small>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Frequency Selector */}
          <div className="wt-field-group">
            <label className="wt-field-label">4. How Many Days Per Week Can You Train?</label>
            <div className="wt-options-grid g3 wt-days-selector">
              {[
                { days: '3', label: '3 Days / Week', sub: 'Full Body (Ideal for busy professionals)' },
                { days: '4', label: '4 Days / Week', sub: 'Upper / Lower (Most popular & balanced)' },
                { days: '5', label: '5 Days / Week', sub: 'Push / Pull / Legs (Elite physique focus)' },
              ].map((item) => (
                <button
                  key={item.days}
                  type="button"
                  className={`wt-day-card ${f.days === item.days ? 'active' : ''}`}
                  onClick={() => setF({ ...f, days: item.days })}
                >
                  <Calendar size={18} />
                  <div>
                    <strong>{item.label}</strong>
                    <small>{item.sub}</small>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary full btn-lg wt-generate-btn">
            <Dumbbell size={20} />
            <span>Generate Free Workout Routine</span>
            <ArrowRight size={18} />
          </button>
        </form>
      ) : (
        /* Generated Workout Plan Result View */
        <div className="workout-plan-result">
          {/* Header Bar */}
          <div className="wpr-header">
            <div className="wpr-meta">
              <span className="pill pill-gold">
                <Sparkles size={13} className="text-yellow" /> Free Custom Routine
              </span>
              <h3>{plan.title}</h3>
              <p className="wpr-schedule-badge">
                <Calendar size={14} /> {plan.schedule}
              </p>
            </div>

            <div className="wpr-actions">
              <button
                type="button"
                className="btn btn-outline-light btn-sm"
                onClick={handleCopyRoutine}
              >
                {copied ? <Check size={14} className="text-yellow" /> : <Copy size={14} />}
                <span>{copied ? 'Routine Copied!' : 'Copy Routine'}</span>
              </button>

              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setPlan(null)}
              >
                <RotateCcw size={14} /> Change Inputs
              </button>
            </div>
          </div>

          {/* Days Accordion / List */}
          <div className="wpr-days-list">
            {plan.days.map((day, dIdx) => (
              <div key={dIdx} className="wpr-day-card">
                <div className="wpr-day-head">
                  <div className="wpr-day-badge">Day {dIdx + 1}</div>
                  <div className="wpr-day-title-info">
                    <h4>{day.name}</h4>
                    <span className="wpr-day-focus">{day.focus}</span>
                  </div>
                </div>

                <div className="wpr-exercises-table">
                  <div className="wpr-ex-header-row">
                    <span>Exercise</span>
                    <span>Target Sets &amp; Reps</span>
                    <span>Rest Interval</span>
                    <span className="wpr-cue-col">Coach Form Cue</span>
                  </div>

                  {day.exercises.map((ex, eIdx) => (
                    <div key={eIdx} className="wpr-ex-row">
                      <div className="wpr-ex-name">
                        <CheckCircle2 size={15} className="text-yellow wpr-ex-icon" />
                        <strong>{ex.name}</strong>
                      </div>
                      <div className="wpr-ex-sets">
                        <span className="wpr-badge-sets">{ex.sets}</span>
                        <span className="wpr-badge-reps">{ex.reps}</span>
                      </div>
                      <div className="wpr-ex-rest">
                        <Clock size={13} /> {ex.rest}
                      </div>
                      <div className="wpr-ex-cue wpr-cue-col">
                        <span>{ex.cue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Coach Shivam's Golden Rules Box */}
          <div className="wpr-rules-box">
            <div className="wpr-rules-header">
              <Award size={18} className="text-yellow" />
              <h4>Coach Shivam’s 3 Rules for Maximum Results</h4>
            </div>
            <div className="wpr-rules-grid">
              <div className="wpr-rule-item">
                <strong>1. Progressive Overload</strong>
                <p>Log your weights. Once you hit the top rep range on all sets, increase weight by 1-2.5 kg next session.</p>
              </div>
              <div className="wpr-rule-item">
                <strong>2. Control The Negative (Eccentric)</strong>
                <p>Lower the weight in 2-3 seconds smoothly. Momentum and swinging rob your muscles of growth stimulus.</p>
              </div>
              <div className="wpr-rule-item">
                <strong>3. Dynamic Warm-up Always</strong>
                <p>Perform 5 minutes of arm circles, leg swings, hip openers, and 2 light ramp-up sets before heavy work.</p>
              </div>
            </div>
          </div>

          {/* Upgrade & Free Form Check CTA */}
          <div className="wpr-whatsapp-cta">
            <div className="wpr-wa-content">
              <ShieldCheck size={20} className="text-yellow" />
              <div>
                <strong>Want Coach Shivam to Review Your Exercise Form for Free?</strong>
                <p>Record a 10-second video of your squat, bench, or deadlift and send it directly on WhatsApp for personal analysis.</p>
              </div>
            </div>
            <a
              href={waWorkoutLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MessageCircle size={18} />
              <span>Send Video on WhatsApp</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

