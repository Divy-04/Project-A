/**
 * Illustrations for the "How it works" sequence.
 *
 * Four scenes on a shared 600 × 460 stage, drawn as one continuous job — a
 * modular kitchen run — so the four steps read as one story rather than four
 * unrelated pictures: the run is measured on site, built up part by part on
 * the bench, driven over, and seated into the gap it was drawn from.
 *
 * Drawn as a set-out elevation. Everything sits on a shared layout so the
 * scenes register with each other as the camera pans: floor at y 340, wall
 * plane 52 → 548, the kitchen run 96 → 504, and a black HUD in the top right
 * that carries the live number in 01 and the sign-off in 04.
 *
 * Figure and ground are kept apart on purpose. The kitchen itself is drawn in
 * a mid grey outline on white; the thing that is *happening* in each step —
 * tape, parts in flight, van, seal bead — is black or brand red. That is what
 * makes each scene legible in the second or two it is on screen.
 *
 * Each scene sits inside a fixed card beside the step copy, at
 * preserveAspectRatio="meet", so the whole drawing is always visible and there
 * is no re-framing to do at any breakpoint. Only the fine annotation drops out
 * once the card is phone-width.
 *
 * Every scene is decorative. The <svg> is aria-hidden and carries nothing that
 * isn't already in the step copy next to it, which is what makes it safe to
 * animate. Motion is scrubbed by `--sp` (the panel's own scroll progress,
 * published by ScrollRig) through the ramp and motion classes in globals.css.
 * Nothing here animates on its own, and nothing here changes layout.
 */

const INK = "#141414";
const DRAW = "#4a4744";
const LINE = "#e2ddd6";
const LINE_2 = "#c2bab0";
const BRAND = "#d93a28";
const PAPER = "#ffffff";
const FILL = "#f4f1ec";
const SOFT = "#a49d94";

/* Shared set-out. Scenes 01 and 04 are the same wall, so every horizontal and
   vertical below is used by both — that registration is what lets the eye read
   the finished run in 04 as the run that was measured in 01. */
const FLOOR = 340;
const RUN_L = 96; // left end of the run
const RUN_R = 504; // right end, at the tall housing
const WALL_T = 132; // wall units
const WALL_B = 202;
const TOP_T = 240; // worktop
const BASE_T = 252; // base carcasses
const BASE_B = 322;
const BASE_R = 368; // base run stops here; the tall housing takes over
const TALL_L = 384;
const GAP_L = 232; // joint the new unit lands against

/**
 * Drawing-board chrome: paper, a faint grid and four corner ticks. Giving all
 * four scenes the same frame is what makes panning between them read as moving
 * the camera rather than cutting to a different drawing.
 */
function Stage({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern
          id={`${id}-grid`}
          width="26"
          height="26"
          patternUnits="userSpaceOnUse"
        >
          <path d="M26 0H0v26" fill="none" stroke={LINE} strokeWidth="1" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="600" height="460" fill="#fcfbfa" />
      <rect
        x="24"
        y="24"
        width="552"
        height="412"
        fill={`url(#${id}-grid)`}
        opacity="0.75"
      />

      <g fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="square">
        <path d="M24 48V24h24" />
        <path d="M552 24h24v24" />
        <path d="M576 412v24h-24" />
        <path d="M48 436H24v-24" />
      </g>
    </>
  );
}

/** The wall the run goes against, plus the floor it stands on. */
function Room() {
  return (
    <>
      <rect x="52" y="120" width="496" height={FLOOR - 120} fill={FILL} />
      <path
        d={`M44 ${FLOOR}h512`}
        stroke={INK}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </>
  );
}

/** Dimension label. Dropped once the card is phone-width and unreadable. */
function Dim({
  x,
  y,
  children,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle";
}) {
  return (
    <text
      className="hiw-fine"
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize="14"
      fontWeight="700"
      letterSpacing="1"
      fill={SOFT}
    >
      {children}
    </text>
  );
}

/* ------------------------------------------------------------------ *
 * 01 — Site survey
 * The tape is pulled across the run and the HUD counts up to 2400.
 * ------------------------------------------------------------------ */

const ODO = ["0", "300", "600", "900", "1200", "1500", "1800", "2100", "2400"];

export function SceneMeasure() {
  return (
    <>
      <Stage id="s1" />
      <Room />

      {/* the kitchen that is going in, set out on the wall */}
      <g fill={PAPER} stroke={LINE_2} strokeWidth="2">
        {/* wall units */}
        <rect x={RUN_L} y={WALL_T} width={BASE_R - RUN_L} height={WALL_B - WALL_T} />
        <path d={`M${GAP_L} ${WALL_T}v${WALL_B - WALL_T}`} />
        {/* tall housing */}
        <rect x={TALL_L} y={WALL_T} width={RUN_R - TALL_L} height={BASE_B - WALL_T} />
        <path d={`M${TALL_L} 246h${RUN_R - TALL_L}`} />
        {/* base run */}
        <rect x={RUN_L} y={BASE_T} width={BASE_R - RUN_L} height={BASE_B - BASE_T} />
        <path
          d={`M164 ${BASE_T}v70M${GAP_L} ${BASE_T}v70M302 ${BASE_T}v70`}
        />
      </g>
      <g fill={LINE_2}>
        <rect x="88" y={TOP_T} width="288" height="12" />
        <rect x="104" y={BASE_B} width="256" height={FLOOR - BASE_B} opacity="0.6" />
      </g>

      {/* what is being measured: witness lines, tape, live number */}
      <path
        d={`M${RUN_L} 196v50M${RUN_R} 196v50`}
        stroke={DRAW}
        strokeWidth="1.5"
      />
      <path
        className="hiw-rb hiw-tape"
        d={`M${RUN_L} 216h408`}
        stroke={INK}
        strokeWidth="10"
      />
      <g className="hiw-rb hiw-tip">
        <path
          d={`M${RUN_L} 199v34`}
          stroke={BRAND}
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>
      <rect x="48" y="192" width="52" height="48" rx="11" fill={INK} />
      <rect x="59" y="204" width="30" height="5" rx="2.5" fill={BRAND} />

      {/* HUD */}
      <rect x="400" y="42" width="146" height="62" rx="12" fill={INK} />
      <clipPath id="s1-odo">
        <rect x="412" y="52" width="122" height="42" />
      </clipPath>
      <g clipPath="url(#s1-odo)">
        <g className="hiw-rb hiw-odo">
          {ODO.map((value, i) => (
            <text
              key={value}
              x="534"
              y={84 + i * 42}
              textAnchor="end"
              fontSize="30"
              fontWeight="800"
              letterSpacing="-0.6"
              fill="#fff"
            >
              {value}
            </text>
          ))}
        </g>
      </g>
      <text
        x="412"
        y="84"
        fontSize="12"
        fontWeight="700"
        letterSpacing="1.4"
        fill="#fff"
        opacity="0.45"
      >
        MM
      </text>

      {/* set-out dimension */}
      <path
        className="hiw-fine"
        d={`M${RUN_L} 366v18M${RUN_R} 366v18M${RUN_L} 375h408`}
        fill="none"
        stroke={SOFT}
        strokeWidth="1.5"
      />
      <Dim x={300} y={402}>
        2400 × 870
      </Dim>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * 02 — Fabrication
 * Eight separate parts land on the bench one after another.
 * ------------------------------------------------------------------ */

export function SceneFabricate() {
  return (
    <>
      <Stage id="s2" />

      {/* bench */}
      <g fill={INK}>
        <rect x="108" y="352" width="384" height="14" />
        <rect x="132" y="366" width="14" height="44" />
        <rect x="456" y="366" width="14" height="44" />
      </g>

      {/* the envelope the parts are building toward */}
      <rect
        x="188"
        y="168"
        width="224"
        height="184"
        fill="none"
        stroke={LINE_2}
        strokeWidth="1.5"
        strokeDasharray="5 7"
      />

      {/* back panel */}
      <rect
        className="hiw-d0 hiw-back"
        x="210"
        y="194"
        width="180"
        height="140"
        fill={FILL}
        stroke={LINE_2}
        strokeWidth="2"
      />
      {/* left gable */}
      <rect
        className="hiw-d1 hiw-fromL"
        x="196"
        y="182"
        width="14"
        height="152"
        fill={PAPER}
        stroke={DRAW}
        strokeWidth="2.5"
      />
      {/* right gable */}
      <rect
        className="hiw-d2 hiw-fromR"
        x="390"
        y="182"
        width="14"
        height="152"
        fill={PAPER}
        stroke={DRAW}
        strokeWidth="2.5"
      />
      {/* plinth — a shade off the bench black so the two don't merge */}
      <rect
        className="hiw-d3 hiw-fromB"
        x="206"
        y="334"
        width="188"
        height="18"
        fill={DRAW}
      />
      {/* top rail */}
      <rect
        className="hiw-d4 hiw-fromT"
        x="210"
        y="182"
        width="180"
        height="12"
        fill={PAPER}
        stroke={DRAW}
        strokeWidth="2.5"
      />
      {/* shelf */}
      <rect
        className="hiw-d5 hiw-fromL"
        x="210"
        y="256"
        width="180"
        height="10"
        fill={PAPER}
        stroke={DRAW}
        strokeWidth="2.5"
      />
      {/* door, with its handle */}
      <g className="hiw-d6 hiw-fromR">
        <rect
          x="302"
          y="194"
          width="88"
          height="140"
          fill={PAPER}
          stroke={DRAW}
          strokeWidth="3"
        />
        <rect x="309" y="248" width="6" height="32" rx="3" fill={BRAND} />
      </g>
      {/* worktop drops on last */}
      <rect
        className="hiw-d7 hiw-fromT"
        x="188"
        y="168"
        width="224"
        height="18"
        rx="2"
        fill={INK}
      />
      {/* joints marked off once everything is together */}
      <g className="hiw-d7 hiw-pop" fill={BRAND}>
        <circle cx="203" cy="188" r="4" />
        <circle cx="397" cy="188" r="4" />
        <circle cx="203" cy="261" r="4" />
        <circle cx="397" cy="261" r="4" />
        <circle cx="203" cy="328" r="4" />
        <circle cx="397" cy="328" r="4" />
      </g>

      {/* set-out, carried over from the survey */}
      <path
        className="hiw-fine"
        d="M188 118v18M412 118v18M188 127h224"
        fill="none"
        stroke={SOFT}
        strokeWidth="1.5"
      />
      <Dim x={300} y={106}>
        600 WIDE
      </Dim>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * 03 — In transit
 * A small blacked-out van runs right to left toward the house.
 * ------------------------------------------------------------------ */

function Wheel({ cx }: { cx: number }) {
  return (
    <>
      <circle cx={cx} cy={-17} r="17" fill={INK} />
      <g className="hiw-wheel">
        <circle cx={cx} cy={-17} r="7.5" fill={PAPER} />
        <path
          d={`M${cx} -25v16M${cx - 8} -17h16`}
          stroke={INK}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </>
  );
}

export function SceneDeliver() {
  return (
    <>
      <Stage id="s3" />

      {/* town, set back */}
      <g fill={FILL} stroke={LINE_2} strokeWidth="1.5" opacity="0.85">
        <rect x="212" y="238" width="62" height="98" />
        <rect x="286" y="204" width="46" height="132" />
        <rect x="344" y="252" width="72" height="84" />
        <rect x="430" y="220" width="54" height="116" />
      </g>

      {/* destination */}
      <g fill={PAPER} stroke={DRAW} strokeWidth="2.5" strokeLinejoin="round">
        <path d="M60 336v-76l58-42 58 42v76z" />
        <rect x="100" y="292" width="36" height="44" />
        <rect x="76" y="252" width="30" height="26" />
      </g>
      <g transform="translate(118 176)">
        <path
          d="M0 30s16-15.5 16-26a16 16 0 1 0-32 0C-16 14.5 0 30 0 30Z"
          fill={BRAND}
        />
        <circle cx="0" cy="2" r="5.6" fill={PAPER} />
      </g>

      {/* road */}
      <path d="M24 336h552" stroke={INK} strokeWidth="3.5" />
      <path
        d="M24 352h552"
        stroke={LINE_2}
        strokeWidth="4"
        strokeDasharray="24 20"
      />

      {/* trailing speed lines, gone by the time it arrives */}
      <g
        className="hiw-rb hiw-speed"
        stroke={SOFT}
        strokeWidth="3.5"
        strokeLinecap="round"
      >
        <path d="M412 228h58" />
        <path d="M438 258h48" />
        <path d="M424 288h66" />
      </g>

      {/*
        The scrubbed pan lives on this group and the static placement on the one
        inside it: a CSS transform overrides a `transform` attribute on the same
        element, so the two must never share one.
      */}
      <g className="hiw-rb hiw-truck">
        <g transform="translate(236 336) scale(0.86)">
          {/* body — cab, box, chassis */}
          <path d="M4 -30v-42q0-10 10-10h34l16 30v22z" fill={INK} />
          <rect x="62" y="-108" width="140" height="78" fill={INK} />
          <rect x="2" y="-30" width="200" height="9" fill={INK} />
          {/* details cut back out to the paper colour */}
          <path d="M14 -74h30l12 24H14z" fill={PAPER} />
          <path d="M132 -104v70" stroke={PAPER} strokeWidth="2" opacity="0.28" />
          <rect x="195" y="-100" width="7" height="13" rx="2" fill={BRAND} />
          <Wheel cx={34} />
          <Wheel cx={148} />
          <Wheel cx={184} />
        </g>
      </g>

      {/* the leg of the job */}
      <g className="hiw-fine" fill="none" stroke={SOFT} strokeWidth="1.5">
        <path d="M118 380v18M504 380v18M118 389h386" />
      </g>
      <Dim x={311} y={416}>
        WORKSHOP → SITE
      </Dim>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * 04 — Installation
 * The finished unit seats into the gap, is sealed, and is signed off.
 * ------------------------------------------------------------------ */

export function SceneFit() {
  return (
    <>
      <Stage id="s4" />
      <Room />

      {/* everything already fixed: wall units, tall housing, the left run */}
      <g fill={PAPER} stroke={DRAW} strokeWidth="2.5">
        <rect x={RUN_L} y={WALL_T} width={BASE_R - RUN_L} height={WALL_B - WALL_T} />
        <path d={`M${GAP_L} ${WALL_T}v${WALL_B - WALL_T}`} />
        <rect x={TALL_L} y={WALL_T} width={RUN_R - TALL_L} height={BASE_B - WALL_T} />
        <path d={`M${TALL_L} 246h${RUN_R - TALL_L}`} />
        <rect x={RUN_L} y={BASE_T} width={GAP_L - RUN_L} height={BASE_B - BASE_T} />
        <path d={`M164 ${BASE_T}v70`} />
      </g>
      <g fill={INK}>
        <rect x="88" y={TOP_T} width={GAP_L - 88} height="12" />
        <rect x="104" y={BASE_B} width={GAP_L - 104} height={FLOOR - BASE_B} />
      </g>
      <g fill={BRAND}>
        <rect x="224" y="158" width="6" height="26" rx="3" />
        <rect x="238" y="158" width="6" height="26" rx="3" />
        <rect x="156" y="272" width="6" height="26" rx="3" />
        <rect x="170" y="272" width="6" height="26" rx="3" />
        <rect x="392" y="200" width="6" height="28" rx="3" />
        <rect x="392" y="262" width="6" height="28" rx="3" />
      </g>

      {/* the unit from step 02, seating into the gap it was drawn for */}
      <g className="hiw-ra hiw-seat">
        <rect
          x="236"
          y={BASE_T}
          width={BASE_R - 236}
          height={BASE_B - BASE_T}
          fill={PAPER}
          stroke={DRAW}
          strokeWidth="2.5"
        />
        <path d={`M302 ${BASE_T}v70`} stroke={DRAW} strokeWidth="2" />
        <g fill={BRAND}>
          <rect x="294" y="272" width="6" height="26" rx="3" />
          <rect x="308" y="272" width="6" height="26" rx="3" />
        </g>
        <g fill={INK}>
          {/* the worktop runs right through to the tall housing it butts */}
          <rect x={GAP_L} y={TOP_T} width={TALL_L - GAP_L} height="12" />
          <rect x={GAP_L} y={BASE_B} width={360 - GAP_L} height={FLOOR - BASE_B} />
        </g>
      </g>

      {/* sealed down both joints and along the back of the worktop */}
      <path
        className="hiw-rd hiw-bead"
        d={`M${GAP_L} ${BASE_B}V238h${TALL_L - GAP_L}v84`}
        fill="none"
        stroke={BRAND}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* signed off — same corner the live number occupied in step 01 */}
      <circle
        className="hiw-rc hiw-ring"
        cx="500"
        cy="72"
        r="30"
        fill="none"
        stroke={BRAND}
        strokeWidth="2.5"
      />
      <g className="hiw-rc hiw-badge">
        <circle cx="500" cy="72" r="30" fill={BRAND} />
        <path
          d="M486 72l10 11 19-22"
          fill="none"
          stroke="#fff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* the survey dimension, confirmed */}
      <path
        className="hiw-fine"
        d={`M${RUN_L} 366v18M${RUN_R} 366v18M${RUN_L} 375h408`}
        fill="none"
        stroke={SOFT}
        strokeWidth="1.5"
      />
      <Dim x={300} y={402}>
        2400 × 870
      </Dim>
    </>
  );
}
