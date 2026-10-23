
import {
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type PointerEvent,
} from "react";

interface RippleBackgroundProps
  extends ComponentPropsWithoutRef<"div"> {
  backgroundColor?: readonly [number, number, number];
}

interface Ripple {
  x: number;
  y: number;
  start: number;
}

const vertexShader = `
  attribute vec2 position;

  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uRipples[8];
  uniform int uCount;

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec2 p = uv;

    float aspect = uResolution.x / uResolution.y;
    p.x *= aspect;

    float wave = 0.0;

    for (int i = 0; i < 8; i++) {
      if (i >= uCount) break;

      vec3 ripple = uRipples[i];

      vec2 center = ripple.xy;
      center.x *= aspect;

      float age = uTime - ripple.z;
      float dist = distance(p, center);
      float radius = age * 0.65;

      float ring = exp(
        -pow((dist - radius) * 28.0, 2.0)
      );

      wave += ring
        * sin((dist - radius) * 45.0)
        * exp(-age * 1.2);
    }

    vec2 distorted = p + vec2(wave * 0.035);

    float pattern =
      sin(distorted.x * 12.0 + distorted.y * 8.0)
      * 0.06;

    vec3 color = uColor + pattern;
    color += wave * 0.22;

    gl_FragColor = vec4(
  vec3(0.3, 0.6, 1.0),
  clamp(abs(wave) * 0.8, 0.0, 0.6)
);
  }
`;

export  function RippleBackground({
  className = "",
  children,
  backgroundColor = [0.04, 0.12, 0.28],
  onPointerDown,
  ...props
}: RippleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const startTimeRef = useRef(0);
  const colorRef = useRef(backgroundColor);

  colorRef.current = backgroundColor;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl", {
  alpha: true,
  premultipliedAlpha: false,
});

    if (!gl) {
      console.error("WebGL is not supported by this browser.");
      return;
    }
    gl.clearColor(0, 0, 0, 0);

    const compileShader = (
      type: number,
      source: string
    ): WebGLShader | null => {
      const shader = gl.createShader(type);

      if (!shader) return null;

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    const vertex = compileShader(gl.VERTEX_SHADER, vertexShader);
    const fragment = compileShader(gl.FRAGMENT_SHADER, fragmentShader);

    if (!vertex || !fragment) {
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
      return;
    }

    const program = gl.createProgram();

    if (!program) {
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();

    if (!buffer) {
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const position = gl.getAttribLocation(program, "position");

    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(
      position,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );

    const resolutionLoc = gl.getUniformLocation(
      program,
      "uResolution"
    );
    const timeLoc = gl.getUniformLocation(program, "uTime");
    const colorLoc = gl.getUniformLocation(program, "uColor");
    const ripplesLoc = gl.getUniformLocation(
      program,
      "uRipples[0]"
    );
    const countLoc = gl.getUniformLocation(program, "uCount");

    const startTime = performance.now();
    startTimeRef.current = startTime;

    let frameId = 0;

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const width = Math.max(
        1,
        Math.round(canvas.clientWidth * dpr)
      );
      const height = Math.max(
        1,
        Math.round(canvas.clientHeight * dpr)
      );

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      const time = (performance.now() - startTime) / 1000;

      ripplesRef.current = ripplesRef.current.filter(
        (ripple) => time - ripple.start < 3
      );

      const rippleData = new Float32Array(8 * 3);

      ripplesRef.current.forEach((ripple, index) => {
        rippleData[index * 3] = ripple.x;
        rippleData[index * 3 + 1] = ripple.y;
        rippleData[index * 3 + 2] = ripple.start;
      });

      gl.uniform2f(resolutionLoc, width, height);
      gl.uniform1f(timeLoc, time);

      gl.uniform3f(
        colorLoc,
        colorRef.current[0],
        colorRef.current[1],
        colorRef.current[2]
      );

      gl.uniform3fv(ripplesLoc, rippleData);
      gl.uniform1i(countLoc, ripplesRef.current.length);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    if (rect.width > 0 && rect.height > 0) {
      const time =
        (performance.now() - startTimeRef.current) / 1000;

      ripplesRef.current.push({
        x: (event.clientX - rect.left) / rect.width,
        y: 1 - (event.clientY - rect.top) / rect.height,
        start: time,
      });

      ripplesRef.current = ripplesRef.current.slice(-8);
    }

    onPointerDown?.(event);
  };

  return (
    <div
      {...props}
      ref={containerRef}
      onPointerDown={handlePointerDown}
      className={`relative isolate overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
