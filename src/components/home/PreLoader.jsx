import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './PreLoader.css';

const CODE_LINES = [
  '<span class="kw">import</span> { <span class="fn">DistributedClusterManager</span>, <span class="typ">NodeProtocolV2</span> } <span class="kw">from</span> <span class="str">"@itsa/distributed-runtime/kernel/v3"</span>; <span class="kw">const</span> cluster = <span class="kw">new</span> <span class="fn">DistributedClusterManager</span>({ shardCount: <span class="typ">64</span>, tls: <span class="kw">true</span> });',
  '<span class="kw">async function</span> <span class="fn">initializeSpatialField</span>(engineConfig: <span class="typ">EngineOptions</span>): <span class="typ">Promise</span>&lt;<span class="typ">ExecutionStatus</span>&gt; { <span class="kw">const</span> buffer = <span class="kw">await</span> cluster.<span class="fn">allocateRingBuffer</span>(<span class="typ">0x40000</span>); <span class="kw">return</span> buffer.<span class="fn">mount</span>(engineConfig); }',
  '<span class="cmt">// [KERNEL DEBUG] 0.08ms latency verified across 1024 mesh nodes — zero hesitation packet routing enabled</span>',
  '<span class="kw">export const</span> <span class="fn">SYSTEM_TOPOLOGY</span>: <span class="typ">Readonly</span>&lt;<span class="typ">Record</span>&lt;<span class="typ">string</span>, <span class="typ">NodeDescriptor</span>&gt;&gt; = { <span class="str">"slrtce-node-01"</span>: { address: <span class="str">"10.244.0.12:9092"</span>, heartbeat: <span class="typ">Date.now</span>(), health: <span class="str">"HEALTHY"</span> } };',
  '<span class="kw">while</span> (student.hasCuriosity() &amp;&amp; !system.isTerminated()) { <span class="kw">const</span> idea = student.<span class="fn">synthesizeNextInnovation</span>(); <span class="kw">await</span> <span class="fn">deployToProduction</span>(idea); }',
  '<span class="kw">git</span> commit -am <span class="str">"feat(core): implement high-frequency quantum entropy stream and neural dispatch gateway"</span> &amp;&amp; <span class="kw">git</span> push origin main --force-with-lease',
  '<span class="kw">const</span> socket = <span class="kw">new</span> <span class="fn">WebSocket</span>(<span class="str">"wss://edge.itsa.slrtce.in/v2/telemetry/live-stream?compression=zstd&amp;auth_bearer=eyJhbGciOi"</span>);',
  '<span class="kw">pub fn</span> <span class="fn">process_incoming_packet_stream</span>&lt;T: <span class="typ">ZeroCopyPayload</span> + <span class="typ">Send</span> + <span class="typ">Sync</span>&gt;(packet: &amp;<span class="kw">mut</span> <span class="typ">VecDeque</span>&lt;T&gt;) -&gt; <span class="typ">Result</span>&lt;<span class="typ">usize</span>, <span class="typ">SystemError</span>&gt; { packet.<span class="fn">drain</span>(..).<span class="fn">fold</span>(0, |acc, _| acc + 1) }',
  '<span class="kw">docker</span> compose -f docker-compose.prod.yml up -d --build --scale worker=16 --remove-orphans &amp;&amp; docker logs -f --tail=200 itsa_production_core',
  '<span class="kw">const</span> [systemThroughput, setThroughput] = <span class="fn">useState</span>&lt;<span class="typ">ThroughputMetrics</span>&gt;({ gigaopsPerSecond: <span class="typ">142.85</span>, memoryBandwidthGbps: <span class="typ">1024.0</span>, status: <span class="str">"PEAK_PERFORMANCE"</span> });',
  '<span class="kw">pragma</span> solidity ^0.8.24; <span class="kw">contract</span> <span class="fn">ITSACommunityToken</span> <span class="kw">is</span> <span class="typ">ERC20Permit</span>, <span class="typ">Ownable2Step</span> { <span class="kw">constructor</span>() <span class="typ">ERC20</span>(<span class="str">"ITSA Innovation"</span>, <span class="str">"ITSA"</span>) { _mint(msg.sender, <span class="typ">1_000_000_000e18</span>); } }',
  '<span class="kw">class</span> <span class="fn">DistributedNeuralPipeline</span>&lt;<span class="typ">InputData</span>, <span class="typ">InferenceResult</span>&gt; <span class="kw">extends</span> <span class="typ">AsyncTransformStream</span>&lt;<span class="typ">InputData</span>, <span class="typ">InferenceResult</span>&gt; { <span class="kw">override async</span> <span class="fn">transform</span>(chunk) { <span class="kw">return</span> <span class="kw">this</span>.<span class="fn">infer</span>(chunk); } }',
  '<span class="kw">SELECT</span> student_id, full_name, repo_count, commits_this_term, rank <span class="kw">FROM</span> engineers <span class="kw">WHERE</span> active = <span class="kw">true</span> <span class="kw">ORDER BY</span> contribution_score <span class="kw">DESC</span> <span class="kw">LIMIT</span> <span class="typ">500</span>;',
  '<span class="kw">systemctl</span> enable --now itsa-matrix-orchestrator.service &amp;&amp; journalctl -u itsa-matrix-orchestrator -f --output=json-pretty',
  '<span class="kw">type</span> <span class="typ">InferenceResult</span>&lt;T&gt; = { success: <span class="kw">true</span>; latencyMs: <span class="typ">number</span>; payload: T } | { success: <span class="kw">false</span>; errorCode: <span class="str">"PIPELINE_UNDERFLOW"</span> };',
  '<span class="kw">pnpm</span> add @tensorflow/tfjs-node-gpu @noble/curves @solana/web3.js fastify @trpc/server @trpc/client drizzle-orm postgres',
  '<span class="kw">cargo</span> build --release --target x86_64-unknown-linux-musl --bin itsa-hypervisor --features <span class="str">"avx512,simd_acceleration,zero_copy"</span>',
  '<span class="cmt">// [CRITICAL MONITOR DISPATCH] Macro optical scan active :: Focal plane calibration calibrated for high-precision inspection</span>',
  '<span class="kw">terraform</span> plan -out=tfplan.binary &amp;&amp; terraform apply -auto-approve tfplan.binary -parallelism=32',
  '<span class="kw">kubectl</span> apply -f k8s/production-ingress.yaml -f k8s/cluster-autoscaler.yaml --namespace=itsa-system --wait=true --timeout=300s',
  '<span class="kw">const</span> model = <span class="kw">new</span> <span class="fn">TransformerDecoder</span>({ numLayers: <span class="typ">32</span>, embeddingDim: <span class="typ">2048</span>, attentionHeads: <span class="typ">32</span>, rotaryEmbeddings: <span class="kw">true</span>, flashAttentionV2: <span class="kw">true</span> });',
  '<span class="kw">def</span> <span class="fn">train_autoregressive_agent</span>(dataset, optimizer, scheduler, max_epochs=<span class="typ">1000</span>): optimizer.<span class="fn">zero_grad</span>(); loss = model(dataset); loss.<span class="fn">backward</span>(); optimizer.<span class="fn">step</span>()',
  '<span class="kw">go func</span>() { <span class="kw">if</span> err := http.<span class="fn">ListenAndServeTLS</span>(<span class="str">":8443"</span>, <span class="str">"certs/cert.pem"</span>, <span class="str">"certs/key.pem"</span>, secureRouter); err != <span class="kw">nil</span> { log.<span class="fn">Fatal</span>(err) } }();',
  '<span class="kw">curl</span> -X POST https://api.slrtce.in/v1/itsa/hackathon/submit -H <span class="str">"Content-Type: application/json"</span> -d <span class="str">\'{"team": "ITSA_ELITE", "status": "SHIPPED"}\'</span>',
  '<span class="kw">let mut</span> memory_arena = <span class="typ">ArenaAllocator</span>::<span class="fn">new</span>(<span class="typ">1024</span> * <span class="typ">1024</span> * <span class="typ">512</span>); <span class="kw">let</span> slice = memory_arena.<span class="fn">alloc_slice_copy</span>(&raw_telemetry_bytes);',
  '<span class="cmt">// Continuous matrix telemetry scrolling at elevated velocity -- RGB syntax highlight verified</span>',
  '<span class="kw">tail</span> -n 100 -f /var/log/itsa/ambition.log | jq <span class="str">\'.level == "INFO" | {timestamp: .time, message: .msg}\'</span>'
];

export default function PreLoader({ onComplete }) {
  const preloaderRef = useRef(null);
  const waterGroupRef = useRef(null);

  useEffect(() => {
    const bootObj = { progress: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1.0,
          ease: 'power4.inOut',
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });
      }
    });

    // Animate liquid rising smoothly through ITSA from 0% (y = 200) to 100% (y = 20)
    // Extended to 5.5s to ensure a sustained, cinematic presence on screen
    tl.to(bootObj, {
      progress: 100,
      duration: 5.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        const p = bootObj.progress;
        const yVal = 200 - (p / 100) * 180;
        if (waterGroupRef.current) {
          waterGroupRef.current.setAttribute('transform', `translate(0, ${yVal})`);
        }
      }
    });

    // Hold at 100% full for 1.2 seconds before transitioning to hero
    tl.to({}, { duration: 1.2 });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  // Repeated 6x for complete vertical coverage
  const repeatedLines = [];
  for (let r = 0; r < 6; r++) {
    for (let j = 0; j < CODE_LINES.length; j++) {
      repeatedLines.push(CODE_LINES[j]);
    }
  }

  return (
    <div id="preloader" ref={preloaderRef} aria-live="polite">
      {/* Background continuous scrolling code monitor scan */}
      <div className="preloader-code-stream" aria-hidden="true">
        <div className="code-stream-col">
          {repeatedLines.map((lineHtml, idx) => (
            <div
              key={idx}
              className="code-stream-row"
              dangerouslySetInnerHTML={{ __html: lineHtml }}
            />
          ))}
        </div>
      </div>

      {/* Main Liquid ITSA Visual */}
      <div className="liquid-preloader-container">
        <div className="liquid-svg-wrapper">
          <svg
            viewBox="0 0 800 240"
            className="liquid-loader-svg"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="ITSA Liquid Wave Loading"
          >
            <defs>
              {/* Thick Bevan Serif ITSA Mask */}
              <mask id="itsa-text-mask">
                <text
                  x="50%"
                  y="62%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="itsa-mask-text"
                >
                  ITSA
                </text>
              </mask>

              {/* Seamless sinusoidal liquid wave */}
              <path
                id="wave-unit"
                d="M 0 30 Q 75 0 150 30 T 300 30 T 450 30 T 600 30 T 750 30 T 900 30 T 1050 30 T 1200 30 V 300 H 0 Z"
              />

              {/* Lavender / Lilac Water Gradient */}
              <linearGradient id="lavender-water-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d4b8e8" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#b793d2" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#7e539e" stopOpacity="0.98" />
              </linearGradient>

              {/* Deep Water Gradient */}
              <linearGradient id="lavender-deep-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#b793d2" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#552f73" stopOpacity="0.85" />
              </linearGradient>
            </defs>

            {/* Ghost outline: Bevan serif ITSA background with subtle lavender edge */}
            <text
              x="50%"
              y="62%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="liquid-ghost-text"
            >
              ITSA
            </text>

            {/* Rising Water Container clipped by the ITSA text */}
            <g mask="url(#itsa-text-mask)">
              {/* Group animated vertically from y=200 down to y=20 */}
              <g ref={waterGroupRef} transform="translate(0, 200)">
                {/* Back wave layer (slower, offset phase) */}
                <use
                  href="#wave-unit"
                  className="wave-back"
                  fill="url(#lavender-deep-grad)"
                />
                {/* Front wave layer (faster, primary wave) */}
                <use
                  href="#wave-unit"
                  className="wave-front"
                  fill="url(#lavender-water-grad)"
                />
              </g>
            </g>
          </svg>
        </div>

        {/* Status Motto */}
        <div className="liquid-status-motto" aria-hidden="true">
          <span>Make it happen</span>
        </div>
      </div>
    </div>
  );
}
