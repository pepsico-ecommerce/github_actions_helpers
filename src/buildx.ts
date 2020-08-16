import * as docker from './docker';
import * as exec from './exec';

export async function isAvailable(): Promise<Boolean> {
  return await exec.exec(`docker`, ['buildx'], true).then(res => {
    if (res.stderr != '' && !res.success) {
      return false;
    }
    return res.success;
  });
}

export async function isInstalled(): Promise<Boolean> {
  const dockerCfg = await docker.config();
  return dockerCfg?.aliases?.builder == 'buildx';
}

export async function use(builder: string): Promise<void> {
  return await exec.exec(`docker`, ['buildx', 'use', '--builder', builder], false).then(res => {
    if (res.stderr != '' && !res.success) {
      throw new Error(res.stderr);
    }
  });
}
