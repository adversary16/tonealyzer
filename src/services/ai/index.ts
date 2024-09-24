import { ML_MODEL } from '../../config';

interface SentimentOutput {
    label: string,
    score: number
}

class AIService {
    #pipeline?: Function

    async #getPipeline(){
        if (!this.#pipeline) {
            const { pipeline }: { pipeline: Function} = await import('@xenova/transformers');
            this.#pipeline = await pipeline('sentiment-analysis', ML_MODEL);
        }
        return this.#pipeline;
    }
    public async analyze(text: string|string[]) {
        const pipe = await this.#getPipeline();
        if (!pipe) throw new Error('No pipeline is available');
        const output: SentimentOutput[] = await pipe(text);
        return output.length > 1 ? output.map(({ label }) => label) : output[0]?.label;
    }
}

export const aiService = new AIService();