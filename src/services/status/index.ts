import { MSEC_IN_SEC } from "../../constants";
import { CpuInfo, cpus, freemem, totalmem } from 'os';

class StatusService {
    #cpuCount = cpus().length;
    #interpolateMsec: number = 1000;
    #checkPeriodMsec: number = 100; 
    #loopTimeout = setTimeout(this.#getStats.bind(this), this.#checkPeriodMsec);
    #cpuMeasurements = new Array<CpuInfo[]>();
    #ramMeasurements = new Array<number>(Math.max(this.#interpolateMsec / this.#checkPeriodMsec, MSEC_IN_SEC / this.#checkPeriodMsec)).fill(0);
    constructor(){

    };

    get cpu() {
        const averages = this.#cpuMeasurements.reduce((acc, cores) => {
            const plainMeasurements = cores.reduce((coreacc, core) => {
                const { times } = core;
                 coreacc.user += times.user;
                 coreacc.nice += times.nice;
                 coreacc.sys += times.sys;
                 coreacc.idle += times.idle;
                 return coreacc;
                }, { user: 0, nice: 0, sys: 0, idle: 0 } as CpuInfo['times']);

            acc.push(plainMeasurements);
            return acc;
        }, <CpuInfo['times'][]>[]);

        const timings = averages.map((a, i) => {
          if (i >= averages.length - 1) return 0;
          const next = averages[i+1];
          const load =  (next.user - a.user) + (next.sys - a.sys);
          const idle = (next.idle - a.idle);
          const delta = load / (load + idle) * 100;
          return delta;
        });

        return timings.reduce((acc, v) => acc += v, 0) / (timings.length - 1);
    }

    get ram(){
        return this.#ramMeasurements.reduce((acc, m) => acc+=( m / totalmem() * 100), 0) / this.#interpolateMsec * this.#checkPeriodMsec;   
    }

    #getStats(){
        if (this.#cpuMeasurements.length > this.#interpolateMsec / this.#checkPeriodMsec) this.#cpuMeasurements.shift()
        this.#cpuMeasurements.push(cpus())

        if (this.#ramMeasurements.length > this.#interpolateMsec / this.#checkPeriodMsec) this.#ramMeasurements.shift()
        this.#ramMeasurements.push(freemem());
        this.#loopTimeout.refresh();
    }

    get status (): { cpu: number, ram: number} {
        return { cpu: this.cpu, ram: this.ram }
    }
}

export const statusService = new StatusService();