export const liquidVertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    vPosition = position;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const liquidFragmentShader = `
  uniform vec3 color;
  uniform float fillLevel;
  uniform float opacity;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    // Normalized height from bottom to top
    float heightFactor = (vPosition.y + 1.0) * 0.5;
    
    // Sharp cutoff at fill level
    if (heightFactor > fillLevel) {
      discard;
    }
    
    // Add some wave effect
    float wave = sin(vPosition.x * 10.0 + vPosition.z * 10.0 + fillLevel * 10.0) * 0.05;
    
    // Fresnel effect for realistic liquid look
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnelFactor = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);
    
    // Combine color with fresnel
    vec3 finalColor = mix(color, vec3(1.0), fresnelFactor * 0.5);
    
    gl_FragColor = vec4(finalColor, opacity);
  }
`; 