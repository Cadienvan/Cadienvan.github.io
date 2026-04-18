import React, { useState, useEffect } from "react";
import { Server, Database, Send, AlertCircle, ArrowRight, RotateCcw, BookOpen, XCircle, Play, Pause } from "lucide-react";

const translations = {
  it: {
    ui: {
      title: "Paxos in Azione",
      step: "Step",
      of: "di",
      prev: "Indietro",
      next: "Avanti",
      play: "Start",
      pause: "Pause",
      proposers: "Proposers (Leader)",
      acceptors: "Acceptors (Quorum)",
      learners: "Learners (Clients)",
      propNumber: "N. Proposta:",
      value: "Valore:",
      promised: "Promessa:",
      accepted: "Accettato:",
      learned: "Valore Appreso:",
      waiting: "In attesa...",
      none: "Nessuna",
      learnerNote: "I Learners rappresentano i componenti del sistema (es. repliche in sola lettura o driver client) a cui interessa solo sapere l'esito del consenso, senza partecipare al voto.",
      modes: {
        simple: "1. Simple (Happy Path)",
        multiple: "2. Multiple (Concurrency)",
        multiple_different: "3. Split Brain (3 Leader)",
        failure: "4. Failure (Crash/Network)",
        real_life: "5. Real-Life (Simulatore)",
      },
    },
    scenarios: {
      simple: [
        { title: "Stato Iniziale", desc: "Un Proposer (P1) vuole proporre 'V1'. Il quorum è composto da 3 Acceptors. Ci sono 2 Learners in attesa di conoscere il risultato finale." },
        { title: "Fase 1: PREPARE", desc: "P1 genera N=1 e manda PREPARE(1) a tutti gli Acceptors." },
        { title: "Fase 1: PROMISE", desc: "Tutti gli Acceptors rispondono PROMISE(1). Promettono di non accettare proposte con N < 1." },
        { title: "Fase 2: ACCEPT", desc: "Ottenuta la maggioranza (3/3), P1 manda ACCEPT(1, 'V1') agli Acceptors." },
        { title: "Fase 2: ACCEPTED", desc: "Gli Acceptors salvano 'V1' perché N=1 rispetta la loro promessa. Il consenso è raggiunto!" },
        { title: "Fase 3: LEARNING", desc: "Gli Acceptors notificano i Learners. Ora il sistema client può leggere il valore confermato 'V1'." },
      ],
      multiple: [
        { title: "Concorrenza: Due Leader", desc: "P1 vuole proporre 'V1', P2 vuole proporre 'V2'. P1 è leggermente più veloce." },
        { title: "P1 inizia la Fase 1", desc: "P1 manda PREPARE(1) agli Acceptor 1 e 2. Entrambi rispondono PROMISE(1)." },
        { title: "P1 manda Accept, ma P2 si sveglia", desc: "P1 manda ACCEPT(1, 'V1') e l'Acceptor 1 lo salva. Nel frattempo, P2 si sveglia e manda PREPARE(2) agli Acceptors 1 e 3." },
        { title: "Il momento cruciale (Safety P2c)", desc: "L'Acceptor 1 riceve PREPARE(2). Aggiorna la promessa a 2, ma avverte P2: 'Ho già accettato V1!'. L'Acceptor 3 promette 2 senza valori pregressi." },
        { title: "P2 adotta il valore di P1", desc: "Per le regole di Paxos, P2 DEVE abbandonare 'V2' e proporre il valore più alto già accettato (V1). Manda ACCEPT(2, 'V1') a A1 e A3." },
        { title: "Consenso (Aiutato)", desc: "A1 e A3 accettano 'V1' con N=2. Anche se P1 era bloccato, P2 ha portato a termine la sua scrittura. Il sistema è coerente." },
      ],
      multiple_different: [
        { title: "Stallo tra due valori", desc: "P1 propone 'V1', P2 propone 'V2', P3 propone 'V1'. P1 e P2 partono in contemporanea ma si spartiscono il quorum." },
        { title: "Fase 1: Split Brain", desc: "P1 ottiene PROMISE(1) da A1. P2 ottiene PROMISE(2) da A2 e A3. Nessuno ha ancora accettato nulla." },
        { title: "Fase 2: Voti Parziali", desc: "P1 manda ACCEPT(1, 'V1') e A1 lo salva. P2 manda ACCEPT(2, 'V2') a A2 che lo salva. A3 è in ritardo. Nessuno ha la maggioranza assoluta (servono 2 voti)." },
        { title: "Interviene P3 (Fase 1)", desc: "La rete è in stallo. P3 decide di agire con un numero più alto. Manda PREPARE(3) a A1 e A3 (creando una nuova potenziale maggioranza)." },
        { title: "P3 riceve i riscontri (Regola P2c)", desc: "A1 avvisa P3: 'Ho già accettato V1!'. A3 non ha valori pregressi. Per la regola di Paxos, P3 DEVE proporre il valore già accettato con N più alto (V1). Casualmente, era proprio quello che P3 voleva!" },
        { title: "Fase 2 per P3: La Spallata Finale", desc: "P3 manda ACCEPT(3, 'V1') a A1 e A3. Entrambi aggiornano e accettano il valore per via del numero di sequenza N=3." },
        { title: "Consenso Raggiunto ('V1')", desc: "A1 e A3 formano la maggioranza vincente per 'V1'. P2 rimane in minoranza con il suo 'V2' isolato su A2. Lo stallo è stato risolto con successo!" },
      ],
      failure: [
        { title: "Partizione di Rete", desc: "P1 inizia la procedura, ma l'Acceptor 3 è offline (Crash). I Learners attendono." },
        { title: "Maggioranza Raggiunta (2 su 3)", desc: "Anche con A3 offline, A1 e A2 bastano per la maggioranza. P1 riceve le PROMISE(1)." },
        { title: "Crash del Proposer 1", desc: "Prima di mandare l'Accept, P1 crasha! Il sistema rimane in sospeso. A1 e A2 hanno promesso, ma non hanno un valore." },
        { title: "Failover: P2 subentra", desc: "P2 va in timeout, si elegge nuovo leader e manda PREPARE(2). Nel frattempo A3 torna online." },
        { title: "Nuova Maggioranza e Accept", desc: "A2 sovrascrive la promessa (da 1 a 2). A3 promette 2. Nessuno aveva un valore pregresso. P2 manda ACCEPT(2, 'V2')." },
        { title: "Fault-Tolerance Dimostrata", desc: "A2 e A3 accettano 'V2'. Maggioranza raggiunta. I Learners acquisiscono 'V2'. Il sistema ha superato 2 crash (A3 e poi P1) senza perdere consistenza." },
      ],
      real_life: [
        { title: "T0: Setup Caotico", desc: "Siamo in produzione. 5 Proposers, 5 Acceptors (quorum=3), 3 Learners. Il sistema è in attesa di richieste client." },
        { title: "T1: Tempesta di Richieste", desc: "Tre processi ricevono richieste concorrenti: P1(Val='A'), P2(Val='B') e P3(Val='C'). Partono tutti insieme mandando PREPARE." },
        { title: "T2: Crash di Rete!", desc: "A1 e A2 subiscono un black-out di rete e vanno offline. I PREPARE di P1, P2 e P3 arrivano solo a A3, A4 e A5." },
        { title: "T3: Frammentazione (No Quorum)", desc: "A3 promette a P1, A4 a P2, A5 a P3. Nessun leader ottiene 3 risposte (la maggioranza di 5). Stallo totale." },
        { title: "T4: Timeout & Recovery", desc: "A1 e A2 tornano online. P4 nota lo stallo, genera un numero di sequenza più alto (N=4, Val='D') e spara un PREPARE(4) a tutto il cluster." },
        { title: "T5: Promesse Convergenti", desc: "Tutti i 5 Acceptor ricevono N=4 (che è maggiore di 1, 2 e 3). Promettono 4. Siccome nessuno aveva accettato definitivamente nulla a T3, non ci sono valori pregressi da imporre a P4." },
        { title: "T6: L'Ultimo Ostacolo", desc: "P4, avendo la maggioranza assoluta delle promesse, invia ACCEPT(4, 'D'). Ma A4 e A5 subiscono un picco di latenza improvviso (Lags/Slow)." },
        { title: "T7: Consenso Raggiunto!", desc: "Non importa il lag di A4 e A5! A1, A2 e A3 accettano 'D'. Sono in 3, quindi formano la maggioranza minima. Il consenso su 'D' è matematicamente garantito." },
        { title: "T8: Propagazione ai Client", desc: "I Learners scoprono il valore. Il sistema è sopravvissuto a concorrenza massiva, nodi caduti, stalli da voto frammentato e latenza di rete." },
        { title: "T9: Un Nuovo Sfidante", desc: "P5 si sveglia in ritardo. Ignorando il consenso già raggiunto, vuole forzare il suo valore 'E'. Manda PREPARE(5) a tutto il cluster." },
        { title: "T10: La Legge di Paxos", desc: "Gli Acceptor aggiornano la promessa a 5, ma A1, A2 e A3 avvertono P5: 'Attenzione, abbiamo già accettato D in via definitiva!'." },
        { title: "T11: L'Immutabilità (Safety)", desc: "In Paxos (Single-Decree), un consenso è per sempre. P5 NON PUÒ sovrascrivere 'D' con 'E'. Per la regola P2c, P5 è costretto ad abbandonare 'E' e proporre 'D' con N=5." },
        { title: "T12: Riaffermazione", desc: "P5 manda ACCEPT(5, 'D'). Il cluster riafferma 'D'. Per cambiare stato (es. x=2 dopo x=1), servirà una nuova istanza (Multi-Paxos), argomento della sezione 3 del paper!" },
      ],
    },
  },
  en: {
    ui: {
      title: "Paxos in Action",
      step: "Step",
      of: "of",
      prev: "Back",
      next: "Next",
      play: "Start",
      pause: "Pause",
      proposers: "Proposers (Leader)",
      acceptors: "Acceptors (Quorum)",
      learners: "Learners (Clients)",
      propNumber: "Prop Num:",
      value: "Value:",
      promised: "Promised:",
      accepted: "Accepted:",
      learned: "Learned Value:",
      waiting: "Waiting...",
      none: "None",
      learnerNote: "Learners represent system components (e.g., read-only replicas or client drivers) that only care about the consensus outcome, without participating in the vote.",
      modes: {
        simple: "1. Simple (Happy Path)",
        multiple: "2. Multiple (Concurrency)",
        multiple_different: "3. Split Brain (3 Leader)",
        failure: "4. Failure (Crash/Network)",
        real_life: "5. Real-Life (Sim)",
      },
    },
    scenarios: {
      simple: [
        { title: "Initial State", desc: "A Proposer (P1) wants to propose 'V1'. The quorum consists of 3 Acceptors. There are 2 Learners waiting for the final result." },
        { title: "Phase 1: PREPARE", desc: "P1 generates N=1 and sends PREPARE(1) to all Acceptors." },
        { title: "Phase 1: PROMISE", desc: "All Acceptors respond with PROMISE(1). They promise not to accept proposals with N < 1." },
        { title: "Phase 2: ACCEPT", desc: "Having reached a majority (3/3), P1 sends ACCEPT(1, 'V1') to the Acceptors." },
        { title: "Phase 2: ACCEPTED", desc: "Acceptors save 'V1' because N=1 respects their promise. Consensus is reached!" },
        { title: "Phase 3: LEARNING", desc: "Acceptors notify Learners. The client system can now read the confirmed value 'V1'." },
      ],
      multiple: [
        { title: "Concurrency: Two Leaders", desc: "P1 wants to propose 'V1', P2 wants to propose 'V2'. P1 is slightly faster." },
        { title: "P1 starts Phase 1", desc: "P1 sends PREPARE(1) to Acceptors 1 and 2. Both respond with PROMISE(1)." },
        { title: "P1 sends Accept, but P2 wakes up", desc: "P1 sends ACCEPT(1, 'V1') and Acceptor 1 saves it. Meanwhile, P2 wakes up and sends PREPARE(2) to Acceptors 1 and 3." },
        { title: "The Crucial Moment (Safety P2c)", desc: "Acceptor 1 receives PREPARE(2). It updates its promise to 2, but warns P2: 'I already accepted V1!'. Acceptor 3 promises 2 with no prior values." },
        { title: "P2 adopts P1's value", desc: "Following Paxos rules, P2 MUST abandon 'V2' and propose the highest already accepted value (V1). It sends ACCEPT(2, 'V1') to A1 and A3." },
        { title: "Consensus (Assisted)", desc: "A1 and A3 accept 'V1' with N=2. Even though P1 was blocked, P2 completed its write. The system is consistent." },
      ],
      multiple_different: [
        { title: "Deadlock between two values", desc: "P1 proposes 'V1', P2 proposes 'V2', P3 proposes 'V1'. P1 and P2 start simultaneously but split the quorum." },
        { title: "Phase 1: Split Brain", desc: "P1 gets PROMISE(1) from A1. P2 gets PROMISE(2) from A2 and A3. No one has accepted anything yet." },
        { title: "Phase 2: Partial Votes", desc: "P1 sends ACCEPT(1, 'V1') and A1 saves it. P2 sends ACCEPT(2, 'V2') to A2 which saves it. A3 is delayed. No one has an absolute majority (2 votes needed)." },
        { title: "P3 Intervenes (Phase 1)", desc: "The network is deadlocked. P3 decides to act with a higher number. It sends PREPARE(3) to A1 and A3 (creating a new potential majority)." },
        { title: "P3 receives feedback (Rule P2c)", desc: "A1 warns P3: 'I already accepted V1!'. A3 has no prior values. Per Paxos rules, P3 MUST propose the highest accepted value (V1). Coincidentally, that's exactly what P3 wanted!" },
        { title: "Phase 2 for P3: The Final Push", desc: "P3 sends ACCEPT(3, 'V1') to A1 and A3. Both update and accept the value due to the sequence number N=3." },
        { title: "Consensus Reached ('V1')", desc: "A1 and A3 form the winning majority for 'V1'. P2 remains in the minority with its isolated 'V2' on A2. The deadlock is successfully resolved!" },
      ],
      failure: [
        { title: "Network Partition", desc: "P1 starts the procedure, but Acceptor 3 is offline (Crash). Learners are waiting." },
        { title: "Majority Reached (2 of 3)", desc: "Even with A3 offline, A1 and A2 are enough for a majority. P1 receives PROMISE(1)." },
        { title: "Proposer 1 Crashes", desc: "Before sending Accept, P1 crashes! The system is left hanging. A1 and A2 promised, but have no value." },
        { title: "Failover: P2 takes over", desc: "P2 times out, elects itself as the new leader, and sends PREPARE(2). Meanwhile, A3 comes back online." },
        { title: "New Majority and Accept", desc: "A2 overwrites the promise (from 1 to 2). A3 promises 2. Neither had a prior value. P2 sends ACCEPT(2, 'V2')." },
        { title: "Fault-Tolerance Demonstrated", desc: "A2 and A3 accept 'V2'. Majority reached. Learners acquire 'V2'. The system survived 2 crashes (A3 then P1) without losing consistency." },
      ],
      real_life: [
        { title: "T0: Chaotic Setup", desc: "Production environment. 5 Proposers, 5 Acceptors (quorum=3), 3 Learners. System is idle awaiting client requests." },
        { title: "T1: Request Storm", desc: "Three processes receive concurrent requests: P1(Val='A'), P2(Val='B'), and P3(Val='C'). They all start simultaneously sending PREPARE." },
        { title: "T2: Network Crash!", desc: "A1 and A2 suffer a network blackout and go offline. The PREPAREs from P1, P2, and P3 only reach A3, A4, and A5." },
        { title: "T3: Fragmentation (No Quorum)", desc: "A3 promises P1, A4 promises P2, A5 promises P3. No leader gets 3 responses (majority of 5). Complete deadlock." },
        { title: "T4: Timeout & Recovery", desc: "A1 and A2 come back online. P4 notices the deadlock, generates a higher sequence number (N=4, Val='D'), and fires a PREPARE(4) to the whole cluster." },
        { title: "T5: Converging Promises", desc: "All 5 Acceptors receive N=4 (which is greater than 1, 2, and 3). They promise 4. Since no value was definitively accepted in T3, P4 can keep its value 'D'." },
        { title: "T6: The Final Hurdle", desc: "P4, having an absolute majority of promises, sends ACCEPT(4, 'D'). But A4 and A5 suffer a sudden latency spike (Lags/Slow)." },
        { title: "T7: Consensus Reached!", desc: "A4 and A5's lag doesn't matter! A1, A2, and A3 accept 'D'. They are 3, forming the minimum majority. Consensus on 'D' is mathematically guaranteed." },
        { title: "T8: Client Propagation", desc: "The Learners discover the value. The system survived massive concurrency, node crashes, fragmented voting deadlocks, and network latency." },
        { title: "T9: A New Challenger", desc: "P5 wakes up late. Unaware of the consensus, it tries to force its value 'E'. It sends PREPARE(5) to the entire cluster." },
        { title: "T10: The Law of Paxos", desc: "Acceptors update their promise to 5, but A1, A2, and A3 warn P5: 'Wait, we already definitively accepted D!'." },
        { title: "T11: Immutability (Safety)", desc: "In Single-Decree Paxos, consensus is forever. P5 CANNOT overwrite 'D' with 'E'. Per rule P2c, P5 is forced to abandon 'E' and propose 'D' with N=5." },
        { title: "T12: Re-affirmation", desc: "P5 sends ACCEPT(5, 'D'). The cluster reaffirms 'D'. To change state, a new instance (Multi-Paxos) is required, as described in section 3 of the paper!" },
      ],
    },
  },
};

const scenariosData = {
  // ... [simple, multiple, multiple_different, failure data omitted here for brevity but fully included in code]
  simple: [
    {
      proposers: [{ id: 1, n: 1, val: "V1", status: "idle" }],
      acceptors: [
        { id: 1, promised: null, acceptedVal: null, status: "idle" },
        { id: 2, promised: null, acceptedVal: null, status: "idle" },
        { id: 3, promised: null, acceptedVal: null, status: "idle" },
      ],
      learners: [
        { id: 1, learned: null, status: "idle" },
        { id: 2, learned: null, status: "idle" },
      ],
    },
    {
      proposers: [{ id: 1, n: 1, val: "V1", status: "sending_prepare" }],
      acceptors: [
        { id: 1, promised: null, acceptedVal: null, status: "receiving" },
        { id: 2, promised: null, acceptedVal: null, status: "receiving" },
        { id: 3, promised: null, acceptedVal: null, status: "receiving" },
      ],
      learners: [
        { id: 1, learned: null, status: "idle" },
        { id: 2, learned: null, status: "idle" },
      ],
    },
    {
      proposers: [{ id: 1, n: 1, val: "V1", status: "receiving_promises" }],
      acceptors: [
        { id: 1, promised: 1, acceptedVal: null, status: "promised" },
        { id: 2, promised: 1, acceptedVal: null, status: "promised" },
        { id: 3, promised: 1, acceptedVal: null, status: "promised" },
      ],
      learners: [
        { id: 1, learned: null, status: "idle" },
        { id: 2, learned: null, status: "idle" },
      ],
    },
    {
      proposers: [{ id: 1, n: 1, val: "V1", status: "sending_accept" }],
      acceptors: [
        { id: 1, promised: 1, acceptedVal: null, status: "receiving" },
        { id: 2, promised: 1, acceptedVal: null, status: "receiving" },
        { id: 3, promised: 1, acceptedVal: null, status: "receiving" },
      ],
      learners: [
        { id: 1, learned: null, status: "idle" },
        { id: 2, learned: null, status: "idle" },
      ],
    },
    {
      proposers: [{ id: 1, n: 1, val: "V1", status: "done" }],
      acceptors: [
        { id: 1, promised: 1, acceptedVal: "V1", status: "accepted" },
        { id: 2, promised: 1, acceptedVal: "V1", status: "accepted" },
        { id: 3, promised: 1, acceptedVal: "V1", status: "accepted" },
      ],
      learners: [
        { id: 1, learned: null, status: "idle" },
        { id: 2, learned: null, status: "idle" },
      ],
    },
    {
      proposers: [{ id: 1, n: 1, val: "V1", status: "success" }],
      acceptors: [
        { id: 1, promised: 1, acceptedVal: "V1", status: "success" },
        { id: 2, promised: 1, acceptedVal: "V1", status: "success" },
        { id: 3, promised: 1, acceptedVal: "V1", status: "success" },
      ],
      learners: [
        { id: 1, learned: "V1", status: "success" },
        { id: 2, learned: "V1", status: "success" },
      ],
    },
  ],
  multiple: [
    {
      proposers: [
        { id: 1, n: 1, val: "V1", status: "idle" },
        { id: 2, n: 2, val: "V2", status: "idle" },
      ],
      acceptors: [
        { id: 1, promised: null, acceptedVal: null, status: "idle" },
        { id: 2, promised: null, acceptedVal: null, status: "idle" },
        { id: 3, promised: null, acceptedVal: null, status: "idle" },
      ],
      learners: [{ id: 1, learned: null, status: "idle" }],
    },
    {
      proposers: [
        { id: 1, n: 1, val: "V1", status: "receiving_promises" },
        { id: 2, n: 2, val: "V2", status: "idle" },
      ],
      acceptors: [
        { id: 1, promised: 1, acceptedVal: null, status: "promised" },
        { id: 2, promised: 1, acceptedVal: null, status: "promised" },
        { id: 3, promised: null, acceptedVal: null, status: "idle" },
      ],
      learners: [{ id: 1, learned: null, status: "idle" }],
    },
    {
      proposers: [
        { id: 1, n: 1, val: "V1", status: "sending_accept" },
        { id: 2, n: 2, val: "V2", status: "sending_prepare" },
      ],
      acceptors: [
        { id: 1, promised: 1, acceptedVal: "V1", status: "accepted" },
        { id: 2, promised: 1, acceptedVal: null, status: "idle" },
        { id: 3, promised: null, acceptedVal: null, status: "receiving" },
      ],
      learners: [{ id: 1, learned: null, status: "idle" }],
    },
    {
      proposers: [
        { id: 1, n: 1, val: "V1", status: "idle" },
        { id: 2, n: 2, val: "V2", status: "receiving_promises" },
      ],
      acceptors: [
        { id: 1, promised: 2, acceptedVal: "V1", status: "promised" },
        { id: 2, promised: 1, acceptedVal: null, status: "idle" },
        { id: 3, promised: 2, acceptedVal: null, status: "promised" },
      ],
      learners: [{ id: 1, learned: null, status: "idle" }],
    },
    {
      proposers: [
        { id: 1, n: 1, val: "V1", status: "idle" },
        { id: 2, n: 2, val: "V1", status: "sending_accept" },
      ],
      acceptors: [
        { id: 1, promised: 2, acceptedVal: "V1", status: "receiving" },
        { id: 2, promised: 1, acceptedVal: null, status: "idle" },
        { id: 3, promised: 2, acceptedVal: null, status: "receiving" },
      ],
      learners: [{ id: 1, learned: null, status: "idle" }],
    },
    {
      proposers: [
        { id: 1, n: 1, val: "V1", status: "success" },
        { id: 2, n: 2, val: "V1", status: "success" },
      ],
      acceptors: [
        { id: 1, promised: 2, acceptedVal: "V1", status: "success" },
        { id: 2, promised: 1, acceptedVal: null, status: "idle" },
        { id: 3, promised: 2, acceptedVal: "V1", status: "success" },
      ],
      learners: [{ id: 1, learned: "V1", status: "success" }],
    },
  ],
  multiple_different: [
    {
      proposers: [
        { id: 1, n: 1, val: "V1", status: "idle" },
        { id: 2, n: 2, val: "V2", status: "idle" },
        { id: 3, n: 3, val: "V1", status: "idle" },
      ],
      acceptors: [
        { id: 1, promised: null, acceptedVal: null, status: "idle" },
        { id: 2, promised: null, acceptedVal: null, status: "idle" },
        { id: 3, promised: null, acceptedVal: null, status: "idle" },
      ],
      learners: [{ id: 1, learned: null, status: "idle" }],
    },
    {
      proposers: [
        { id: 1, n: 1, val: "V1", status: "receiving_promises" },
        { id: 2, n: 2, val: "V2", status: "receiving_promises" },
        { id: 3, n: 3, val: "V1", status: "idle" },
      ],
      acceptors: [
        { id: 1, promised: 1, acceptedVal: null, status: "promised" },
        { id: 2, promised: 2, acceptedVal: null, status: "promised" },
        { id: 3, promised: 2, acceptedVal: null, status: "promised" },
      ],
      learners: [{ id: 1, learned: null, status: "idle" }],
    },
    {
      proposers: [
        { id: 1, n: 1, val: "V1", status: "sending_accept" },
        { id: 2, n: 2, val: "V2", status: "sending_accept" },
        { id: 3, n: 3, val: "V1", status: "idle" },
      ],
      acceptors: [
        { id: 1, promised: 1, acceptedVal: "V1", status: "accepted" },
        { id: 2, promised: 2, acceptedVal: "V2", status: "accepted" },
        { id: 3, promised: 2, acceptedVal: null, status: "idle" },
      ],
      learners: [{ id: 1, learned: null, status: "idle" }],
    },
    {
      proposers: [
        { id: 1, n: 1, val: "V1", status: "idle" },
        { id: 2, n: 2, val: "V2", status: "idle" },
        { id: 3, n: 3, val: "V1", status: "sending_prepare" },
      ],
      acceptors: [
        { id: 1, promised: 3, acceptedVal: "V1", status: "receiving" },
        { id: 2, promised: 2, acceptedVal: "V2", status: "idle" },
        { id: 3, promised: 3, acceptedVal: null, status: "receiving" },
      ],
      learners: [{ id: 1, learned: null, status: "idle" }],
    },
    {
      proposers: [
        { id: 1, n: 1, val: "V1", status: "idle" },
        { id: 2, n: 2, val: "V2", status: "idle" },
        { id: 3, n: 3, val: "V1", status: "receiving_promises" },
      ],
      acceptors: [
        { id: 1, promised: 3, acceptedVal: "V1", status: "promised" },
        { id: 2, promised: 2, acceptedVal: "V2", status: "idle" },
        { id: 3, promised: 3, acceptedVal: null, status: "promised" },
      ],
      learners: [{ id: 1, learned: null, status: "idle" }],
    },
    {
      proposers: [
        { id: 1, n: 1, val: "V1", status: "idle" },
        { id: 2, n: 2, val: "V2", status: "idle" },
        { id: 3, n: 3, val: "V1", status: "sending_accept" },
      ],
      acceptors: [
        { id: 1, promised: 3, acceptedVal: "V1", status: "receiving" },
        { id: 2, promised: 2, acceptedVal: "V2", status: "idle" },
        { id: 3, promised: 3, acceptedVal: "V1", status: "receiving" },
      ],
      learners: [{ id: 1, learned: null, status: "idle" }],
    },
    {
      proposers: [
        { id: 1, n: 1, val: "V1", status: "idle" },
        { id: 2, n: 2, val: "V2", status: "idle" },
        { id: 3, n: 3, val: "V1", status: "success" },
      ],
      acceptors: [
        { id: 1, promised: 3, acceptedVal: "V1", status: "success" },
        { id: 2, promised: 2, acceptedVal: "V2", status: "idle" },
        { id: 3, promised: 3, acceptedVal: "V1", status: "success" },
      ],
      learners: [{ id: 1, learned: "V1", status: "success" }],
    },
  ],
  failure: [
    {
      proposers: [
        { id: 1, n: 1, val: "V1", status: "sending_prepare" },
        { id: 2, n: 2, val: "V2", status: "idle" },
      ],
      acceptors: [
        { id: 1, promised: null, acceptedVal: null, status: "receiving" },
        { id: 2, promised: null, acceptedVal: null, status: "receiving" },
        { id: 3, promised: null, acceptedVal: null, status: "failed" },
      ],
      learners: [{ id: 1, learned: null, status: "idle" }],
    },
    {
      proposers: [
        { id: 1, n: 1, val: "V1", status: "receiving_promises" },
        { id: 2, n: 2, val: "V2", status: "idle" },
      ],
      acceptors: [
        { id: 1, promised: 1, acceptedVal: null, status: "promised" },
        { id: 2, promised: 1, acceptedVal: null, status: "promised" },
        { id: 3, promised: null, acceptedVal: null, status: "failed" },
      ],
      learners: [{ id: 1, learned: null, status: "idle" }],
    },
    {
      proposers: [
        { id: 1, n: 1, val: "V1", status: "failed" },
        { id: 2, n: 2, val: "V2", status: "idle" },
      ],
      acceptors: [
        { id: 1, promised: 1, acceptedVal: null, status: "idle" },
        { id: 2, promised: 1, acceptedVal: null, status: "idle" },
        { id: 3, promised: null, acceptedVal: null, status: "failed" },
      ],
      learners: [{ id: 1, learned: null, status: "idle" }],
    },
    {
      proposers: [
        { id: 1, n: 1, val: "V1", status: "failed" },
        { id: 2, n: 2, val: "V2", status: "sending_prepare" },
      ],
      acceptors: [
        { id: 1, promised: 1, acceptedVal: null, status: "idle" },
        { id: 2, promised: 1, acceptedVal: null, status: "receiving" },
        { id: 3, promised: null, acceptedVal: null, status: "receiving" },
      ],
      learners: [{ id: 1, learned: null, status: "idle" }],
    },
    {
      proposers: [
        { id: 1, n: 1, val: "V1", status: "failed" },
        { id: 2, n: 2, val: "V2", status: "sending_accept" },
      ],
      acceptors: [
        { id: 1, promised: 1, acceptedVal: null, status: "idle" },
        { id: 2, promised: 2, acceptedVal: null, status: "receiving" },
        { id: 3, promised: 2, acceptedVal: null, status: "receiving" },
      ],
      learners: [{ id: 1, learned: null, status: "idle" }],
    },
    {
      proposers: [
        { id: 1, n: 1, val: "V1", status: "failed" },
        { id: 2, n: 2, val: "V2", status: "success" },
      ],
      acceptors: [
        { id: 1, promised: 1, acceptedVal: null, status: "idle" },
        { id: 2, promised: 2, acceptedVal: "V2", status: "success" },
        { id: 3, promised: 2, acceptedVal: "V2", status: "success" },
      ],
      learners: [{ id: 1, learned: "V2", status: "success" }],
    },
  ],
  real_life: [
    // T0
    {
      proposers: [
        { id: 1, n: 1, val: "A", status: "idle" },
        { id: 2, n: 2, val: "B", status: "idle" },
        { id: 3, n: 3, val: "C", status: "idle" },
        { id: 4, n: 4, val: "D", status: "idle" },
        { id: 5, n: 5, val: "E", status: "idle" },
      ],
      acceptors: [
        { id: 1, promised: null, acceptedVal: null, status: "idle" },
        { id: 2, promised: null, acceptedVal: null, status: "idle" },
        { id: 3, promised: null, acceptedVal: null, status: "idle" },
        { id: 4, promised: null, acceptedVal: null, status: "idle" },
        { id: 5, promised: null, acceptedVal: null, status: "idle" },
      ],
      learners: [
        { id: 1, learned: null, status: "idle" },
        { id: 2, learned: null, status: "idle" },
        { id: 3, learned: null, status: "idle" },
      ],
    },
    // T1
    {
      proposers: [
        { id: 1, n: 1, val: "A", status: "sending_prepare" },
        { id: 2, n: 2, val: "B", status: "sending_prepare" },
        { id: 3, n: 3, val: "C", status: "sending_prepare" },
        { id: 4, n: 4, val: "D", status: "idle" },
        { id: 5, n: 5, val: "E", status: "idle" },
      ],
      acceptors: [
        { id: 1, promised: null, acceptedVal: null, status: "idle" },
        { id: 2, promised: null, acceptedVal: null, status: "idle" },
        { id: 3, promised: null, acceptedVal: null, status: "idle" },
        { id: 4, promised: null, acceptedVal: null, status: "idle" },
        { id: 5, promised: null, acceptedVal: null, status: "idle" },
      ],
      learners: [
        { id: 1, learned: null, status: "idle" },
        { id: 2, learned: null, status: "idle" },
        { id: 3, learned: null, status: "idle" },
      ],
    },
    // T2
    {
      proposers: [
        { id: 1, n: 1, val: "A", status: "sending_prepare" },
        { id: 2, n: 2, val: "B", status: "sending_prepare" },
        { id: 3, n: 3, val: "C", status: "sending_prepare" },
        { id: 4, n: 4, val: "D", status: "idle" },
        { id: 5, n: 5, val: "E", status: "idle" },
      ],
      acceptors: [
        { id: 1, promised: null, acceptedVal: null, status: "failed" },
        { id: 2, promised: null, acceptedVal: null, status: "failed" },
        { id: 3, promised: null, acceptedVal: null, status: "receiving" },
        { id: 4, promised: null, acceptedVal: null, status: "receiving" },
        { id: 5, promised: null, acceptedVal: null, status: "receiving" },
      ],
      learners: [
        { id: 1, learned: null, status: "idle" },
        { id: 2, learned: null, status: "idle" },
        { id: 3, learned: null, status: "idle" },
      ],
    },
    // T3
    {
      proposers: [
        { id: 1, n: 1, val: "A", status: "receiving_promises" },
        { id: 2, n: 2, val: "B", status: "receiving_promises" },
        { id: 3, n: 3, val: "C", status: "receiving_promises" },
        { id: 4, n: 4, val: "D", status: "idle" },
        { id: 5, n: 5, val: "E", status: "idle" },
      ],
      acceptors: [
        { id: 1, promised: null, acceptedVal: null, status: "failed" },
        { id: 2, promised: null, acceptedVal: null, status: "failed" },
        { id: 3, promised: 1, acceptedVal: null, status: "promised" },
        { id: 4, promised: 2, acceptedVal: null, status: "promised" },
        { id: 5, promised: 3, acceptedVal: null, status: "promised" },
      ],
      learners: [
        { id: 1, learned: null, status: "idle" },
        { id: 2, learned: null, status: "idle" },
        { id: 3, learned: null, status: "idle" },
      ],
    },
    // T4
    {
      proposers: [
        { id: 1, n: 1, val: "A", status: "idle" },
        { id: 2, n: 2, val: "B", status: "idle" },
        { id: 3, n: 3, val: "C", status: "idle" },
        { id: 4, n: 4, val: "D", status: "sending_prepare" },
        { id: 5, n: 5, val: "E", status: "idle" },
      ],
      acceptors: [
        { id: 1, promised: null, acceptedVal: null, status: "receiving" },
        { id: 2, promised: null, acceptedVal: null, status: "receiving" },
        { id: 3, promised: 1, acceptedVal: null, status: "receiving" },
        { id: 4, promised: 2, acceptedVal: null, status: "receiving" },
        { id: 5, promised: 3, acceptedVal: null, status: "receiving" },
      ],
      learners: [
        { id: 1, learned: null, status: "idle" },
        { id: 2, learned: null, status: "idle" },
        { id: 3, learned: null, status: "idle" },
      ],
    },
    // T5
    {
      proposers: [
        { id: 1, n: 1, val: "A", status: "idle" },
        { id: 2, n: 2, val: "B", status: "idle" },
        { id: 3, n: 3, val: "C", status: "idle" },
        { id: 4, n: 4, val: "D", status: "receiving_promises" },
        { id: 5, n: 5, val: "E", status: "idle" },
      ],
      acceptors: [
        { id: 1, promised: 4, acceptedVal: null, status: "promised" },
        { id: 2, promised: 4, acceptedVal: null, status: "promised" },
        { id: 3, promised: 4, acceptedVal: null, status: "promised" },
        { id: 4, promised: 4, acceptedVal: null, status: "promised" },
        { id: 5, promised: 4, acceptedVal: null, status: "promised" },
      ],
      learners: [
        { id: 1, learned: null, status: "idle" },
        { id: 2, learned: null, status: "idle" },
        { id: 3, learned: null, status: "idle" },
      ],
    },
    // T6
    {
      proposers: [
        { id: 1, n: 1, val: "A", status: "idle" },
        { id: 2, n: 2, val: "B", status: "idle" },
        { id: 3, n: 3, val: "C", status: "idle" },
        { id: 4, n: 4, val: "D", status: "sending_accept" },
        { id: 5, n: 5, val: "E", status: "idle" },
      ],
      acceptors: [
        { id: 1, promised: 4, acceptedVal: null, status: "receiving" },
        { id: 2, promised: 4, acceptedVal: null, status: "receiving" },
        { id: 3, promised: 4, acceptedVal: null, status: "receiving" },
        { id: 4, promised: 4, acceptedVal: null, status: "slow" },
        { id: 5, promised: 4, acceptedVal: null, status: "slow" },
      ],
      learners: [
        { id: 1, learned: null, status: "idle" },
        { id: 2, learned: null, status: "idle" },
        { id: 3, learned: null, status: "idle" },
      ],
    },
    // T7
    {
      proposers: [
        { id: 1, n: 1, val: "A", status: "idle" },
        { id: 2, n: 2, val: "B", status: "idle" },
        { id: 3, n: 3, val: "C", status: "idle" },
        { id: 4, n: 4, val: "D", status: "success" },
        { id: 5, n: 5, val: "E", status: "idle" },
      ],
      acceptors: [
        { id: 1, promised: 4, acceptedVal: "D", status: "success" },
        { id: 2, promised: 4, acceptedVal: "D", status: "success" },
        { id: 3, promised: 4, acceptedVal: "D", status: "success" },
        { id: 4, promised: 4, acceptedVal: null, status: "slow" },
        { id: 5, promised: 4, acceptedVal: null, status: "slow" },
      ],
      learners: [
        { id: 1, learned: null, status: "idle" },
        { id: 2, learned: null, status: "idle" },
        { id: 3, learned: null, status: "idle" },
      ],
    },
    // T8
    {
      proposers: [
        { id: 1, n: 1, val: "A", status: "idle" },
        { id: 2, n: 2, val: "B", status: "idle" },
        { id: 3, n: 3, val: "C", status: "idle" },
        { id: 4, n: 4, val: "D", status: "idle" },
        { id: 5, n: 5, val: "E", status: "idle" },
      ],
      acceptors: [
        { id: 1, promised: 4, acceptedVal: "D", status: "success" },
        { id: 2, promised: 4, acceptedVal: "D", status: "success" },
        { id: 3, promised: 4, acceptedVal: "D", status: "success" },
        { id: 4, promised: 4, acceptedVal: null, status: "idle" },
        { id: 5, promised: 4, acceptedVal: null, status: "idle" },
      ],
      learners: [
        { id: 1, learned: "D", status: "success" },
        { id: 2, learned: "D", status: "success" },
        { id: 3, learned: "D", status: "success" },
      ],
    },
    // T9: P5 tries to propose 'E'
    {
      proposers: [
        { id: 1, n: 1, val: "A", status: "idle" },
        { id: 2, n: 2, val: "B", status: "idle" },
        { id: 3, n: 3, val: "C", status: "idle" },
        { id: 4, n: 4, val: "D", status: "idle" },
        { id: 5, n: 5, val: "E", status: "sending_prepare" },
      ],
      acceptors: [
        { id: 1, promised: 4, acceptedVal: "D", status: "receiving" },
        { id: 2, promised: 4, acceptedVal: "D", status: "receiving" },
        { id: 3, promised: 4, acceptedVal: "D", status: "receiving" },
        { id: 4, promised: 4, acceptedVal: null, status: "receiving" },
        { id: 5, promised: 4, acceptedVal: null, status: "receiving" },
      ],
      learners: [
        { id: 1, learned: "D", status: "success" },
        { id: 2, learned: "D", status: "success" },
        { id: 3, learned: "D", status: "success" },
      ],
    },
    // T10: Acceptors warn P5 about 'D'
    {
      proposers: [
        { id: 1, n: 1, val: "A", status: "idle" },
        { id: 2, n: 2, val: "B", status: "idle" },
        { id: 3, n: 3, val: "C", status: "idle" },
        { id: 4, n: 4, val: "D", status: "idle" },
        { id: 5, n: 5, val: "E", status: "receiving_promises" },
      ],
      acceptors: [
        { id: 1, promised: 5, acceptedVal: "D", status: "promised" },
        { id: 2, promised: 5, acceptedVal: "D", status: "promised" },
        { id: 3, promised: 5, acceptedVal: "D", status: "promised" },
        { id: 4, promised: 5, acceptedVal: null, status: "promised" },
        { id: 5, promised: 5, acceptedVal: null, status: "promised" },
      ],
      learners: [
        { id: 1, learned: "D", status: "success" },
        { id: 2, learned: "D", status: "success" },
        { id: 3, learned: "D", status: "success" },
      ],
    },
    // T11: P5 is FORCED to change 'E' to 'D' and sends ACCEPT
    {
      proposers: [
        { id: 1, n: 1, val: "A", status: "idle" },
        { id: 2, n: 2, val: "B", status: "idle" },
        { id: 3, n: 3, val: "C", status: "idle" },
        { id: 4, n: 4, val: "D", status: "idle" },
        { id: 5, n: 5, val: "D", status: "sending_accept" },
      ],
      acceptors: [
        { id: 1, promised: 5, acceptedVal: "D", status: "receiving" },
        { id: 2, promised: 5, acceptedVal: "D", status: "receiving" },
        { id: 3, promised: 5, acceptedVal: "D", status: "receiving" },
        { id: 4, promised: 5, acceptedVal: null, status: "receiving" },
        { id: 5, promised: 5, acceptedVal: null, status: "receiving" },
      ],
      learners: [
        { id: 1, learned: "D", status: "success" },
        { id: 2, learned: "D", status: "success" },
        { id: 3, learned: "D", status: "success" },
      ],
    },
    // T12: Re-affirmation
    {
      proposers: [
        { id: 1, n: 1, val: "A", status: "idle" },
        { id: 2, n: 2, val: "B", status: "idle" },
        { id: 3, n: 3, val: "C", status: "idle" },
        { id: 4, n: 4, val: "D", status: "idle" },
        { id: 5, n: 5, val: "D", status: "success" },
      ],
      acceptors: [
        { id: 1, promised: 5, acceptedVal: "D", status: "success" },
        { id: 2, promised: 5, acceptedVal: "D", status: "success" },
        { id: 3, promised: 5, acceptedVal: "D", status: "success" },
        { id: 4, promised: 5, acceptedVal: "D", status: "success" },
        { id: 5, promised: 5, acceptedVal: "D", status: "success" },
      ],
      learners: [
        { id: 1, learned: "D", status: "success" },
        { id: 2, learned: "D", status: "success" },
        { id: 3, learned: "D", status: "success" },
      ],
    },
  ],
};

const PaxosSimulator = () => {
  const [lang, setLang] = useState("it");
  const [mode, setMode] = useState("real_life");
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const t = translations[lang];
  const currentScenarioTexts = t.scenarios[mode];
  const currentData = scenariosData[mode][step];

  // Auto-play logic
  useEffect(() => {
    let interval;
    if (isPlaying && step < currentScenarioTexts.length - 1) {
      interval = setInterval(() => {
        setStep(s => s + 1);
      }, 3000); // 3 secondi per ogni transizione
    } else if (step >= currentScenarioTexts.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, step, currentScenarioTexts.length]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setStep(s => Math.min(s + 1, currentScenarioTexts.length - 1));
    setIsPlaying(false);
  };
  const handlePrev = () => {
    setStep(s => Math.max(s - 1, 0));
    setIsPlaying(false);
  };
  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  const changeMode = newMode => {
    setMode(newMode);
    setStep(0);
    setIsPlaying(false);
  };

  // UI Helpers
  const getStatusClasses = (status, type) => {
    if (status === "failed") return "bg-red-50 border-red-400 text-red-600 opacity-60";
    if (status === "slow") return "bg-orange-50 border-orange-400 text-orange-700 opacity-80";
    if (status === "success") return "bg-green-100 border-green-500 text-green-800 shadow-md";
    if (status === "sending_prepare" || status === "sending_accept") return "bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-200";
    if (status === "receiving" || status === "receiving_promises") return "bg-blue-50 border-blue-400 text-blue-600 animate-pulse";
    if (status === "promised") return "bg-yellow-50 border-yellow-400 text-yellow-700";
    if (status === "accepted") return "bg-green-50 border-green-400 text-green-700";
    if (status === "learning") return "bg-purple-50 border-purple-400 text-purple-600 animate-pulse";
    return "bg-white border-slate-300 text-slate-500";
  };

  const itemPadding = mode === "real_life" ? "p-2 md:p-3" : "p-4";

  return (
    <div className='min-h-screen bg-slate-50 text-slate-900 p-6 font-sans'>
      <div className='max-w-6xl mx-auto'>
        {/* Mode Selector */}
        <div className='flex flex-wrap gap-2 mb-6 p-1 bg-slate-200 rounded-lg w-fit'>
          {Object.entries(t.ui.modes).map(([mKey, mLabel]) => (
            <button key={mKey} onClick={() => changeMode(mKey)} className={`px-3 py-2 text-sm font-bold rounded-md transition-colors ${mode === mKey ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:bg-slate-300"}`}>
              {mLabel}
            </button>
          ))}
        </div>

        {/* Header & Controls */}
        <div className='mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
          <div>
            <h2 className='text-2xl font-bold text-slate-800 flex items-center gap-2'>
              {t.ui.title}{" "}
              <span className='text-sm font-normal px-2 py-1 bg-slate-200 rounded-full'>
                {t.ui.step} {step} {t.ui.of} {currentScenarioTexts.length - 1}
              </span>
            </h2>
          </div>

          <div className='flex flex-wrap gap-2 items-center'>
            <div className='flex bg-slate-200 p-1 rounded-lg mr-2 gap-1'>
              <button onClick={() => setLang("it")} className={`px-2 py-1 rounded-md transition-all ${lang === "it" ? "bg-white shadow-sm grayscale-0" : "grayscale opacity-50 hover:opacity-100 hover:grayscale-0"}`} title='Italiano'>
                🇮🇹
              </button>
              <button onClick={() => setLang("en")} className={`px-2 py-1 rounded-md transition-all ${lang === "en" ? "bg-white shadow-sm grayscale-0" : "grayscale opacity-50 hover:opacity-100 hover:grayscale-0"}`} title='English'>
                🇬🇧
              </button>
            </div>

            <button onClick={togglePlay} className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors flex items-center gap-2 ${isPlaying ? "bg-orange-100 text-orange-700 border border-orange-300" : "bg-green-600 text-white hover:bg-green-700"}`}>
              {isPlaying ? (
                <>
                  <Pause size={16} /> {t.ui.pause}
                </>
              ) : (
                <>
                  <Play size={16} /> {t.ui.play}
                </>
              )}
            </button>

            <button onClick={handlePrev} disabled={step === 0} className='px-3 py-2 text-sm font-medium rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors'>
              {t.ui.prev}
            </button>
            <button onClick={handleNext} disabled={step === currentScenarioTexts.length - 1} className='px-3 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-1'>
              {t.ui.next} <ArrowRight size={16} />
            </button>
            <button onClick={handleReset} className='p-2 text-slate-500 hover:bg-slate-200 rounded-lg transition-colors' title='Reset'>
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        {/* Explanation Box */}
        <div className={`mb-8 p-5 bg-white rounded-xl border-l-4 shadow-sm transition-colors duration-300 ${isPlaying ? "border-l-green-500 bg-green-50/30" : "border-l-blue-500"}`}>
          <h3 className='text-lg font-bold text-slate-800 mb-1'>{currentScenarioTexts[step].title}</h3>
          <p className='text-slate-600'>{currentScenarioTexts[step].desc}</p>
        </div>

        {/* Grid Canvas */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 md:p-6 bg-white rounded-xl border border-slate-200 shadow-inner min-h-[450px]'>
          {/* Column 1: Proposers */}
          <div className='flex flex-col gap-3 relative'>
            <h3 className='font-bold text-slate-400 text-sm uppercase tracking-wider mb-1 flex items-center gap-2'>
              <Server size={16} /> {t.ui.proposers}
            </h3>
            {currentData.proposers.map(p => (
              <div key={p.id} className={`${itemPadding} rounded-xl border-2 transition-all duration-300 ${getStatusClasses(p.status)} relative`}>
                {p.status === "failed" && (
                  <div className='absolute inset-0 bg-white/40 flex items-center justify-center z-10'>
                    <XCircle className='text-red-500 w-10 h-10 drop-shadow' />
                  </div>
                )}
                <div className='flex justify-between items-center mb-2 border-b pb-1 border-slate-200/50'>
                  <span className='font-bold text-sm'>Proposer {p.id}</span>
                </div>
                <div className='space-y-1 text-xs'>
                  <div className='flex justify-between bg-white/50 px-2 py-0.5 rounded'>
                    <span className='opacity-80'>{t.ui.propNumber}</span>
                    <span className='font-mono font-bold'>{p.n}</span>
                  </div>
                  <div className='flex justify-between bg-white/50 px-2 py-0.5 rounded'>
                    <span className='opacity-80'>{t.ui.value}</span>
                    <span className='font-mono font-bold'>{p.val}</span>
                  </div>
                  {p.status === "sending_prepare" && (
                    <div className='mt-1 text-blue-700 bg-blue-100 p-1 rounded text-center animate-pulse'>
                      <Send size={10} className='inline mr-1' /> PREPARE({p.n})
                    </div>
                  )}
                  {p.status === "sending_accept" && (
                    <div className='mt-1 text-blue-700 bg-blue-100 p-1 rounded text-center animate-pulse'>
                      <Send size={10} className='inline mr-1' /> ACCEPT({p.n}, {p.val})
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Acceptors (Quorum) */}
          <div className='flex flex-col gap-3'>
            <h3 className='font-bold text-slate-400 text-sm uppercase tracking-wider mb-1 flex items-center gap-2'>
              <Database size={16} /> {t.ui.acceptors}
            </h3>
            {currentData.acceptors.map(a => (
              <div key={a.id} className={`${itemPadding} rounded-xl border-2 transition-all duration-300 flex items-center gap-3 ${getStatusClasses(a.status)} relative overflow-hidden`}>
                {a.status === "failed" && (
                  <div className='absolute inset-0 bg-red-100/50 flex items-center justify-center z-10'>
                    <AlertCircle className='text-red-600 opacity-80' size={24} />
                  </div>
                )}
                {a.status === "slow" && <div className='absolute inset-0 bg-orange-100/30 flex items-center justify-center z-10 font-bold text-orange-600 opacity-60 uppercase text-xs tracking-widest rotate-12'>Lag</div>}
                <Database className='w-6 h-6 opacity-60 shrink-0' />
                <div className='flex-1 space-y-1 text-xs z-0'>
                  <div className='font-bold text-sm'>Acceptor {a.id}</div>
                  <div className='flex justify-between bg-white/60 px-2 py-0.5 rounded'>
                    <span>{t.ui.promised}</span>
                    <span className='font-mono font-bold'>{a.promised || "-"}</span>
                  </div>
                  <div className='flex justify-between bg-white/60 px-2 py-0.5 rounded'>
                    <span>{t.ui.accepted}</span>
                    <span className='font-mono font-bold text-green-700'>{a.acceptedVal || "-"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3: Learners */}
          <div className='flex flex-col gap-3'>
            <h3 className='font-bold text-slate-400 text-sm uppercase tracking-wider mb-1 flex items-center gap-2'>
              <BookOpen size={16} /> {t.ui.learners}
            </h3>
            {currentData.learners.map(l => (
              <div key={l.id} className={`${itemPadding} rounded-xl border-2 transition-all duration-300 flex items-center gap-3 ${getStatusClasses(l.status)}`}>
                <BookOpen className='w-5 h-5 opacity-60' />
                <div>
                  <div className='font-bold text-sm'>Learner {l.id}</div>
                  <div className='text-xs opacity-80 mt-1'>
                    {t.ui.learned} <span className={`font-mono font-bold ml-1 ${l.learned ? "text-green-700 bg-green-100 px-1 rounded" : ""}`}>{l.learned || t.ui.waiting}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className='mt-auto p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500 text-center italic leading-relaxed'>{t.ui.learnerNote}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaxosSimulator;
