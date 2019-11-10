import Typography from 'typography';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Funston from 'typography-theme-funston';

const typography = new Typography(Funston);

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
