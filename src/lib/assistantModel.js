let loading;
export async function matchIntent(question, examples){
 if(!loading){
  const url="https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2";
  loading=import(/* @vite-ignore */ url).then(async ({pipeline,env})=>{
   env.allowLocalModels=false;
   env.backends.onnx.wasm.numThreads=1;
   return pipeline("feature-extraction","Xenova/paraphrase-multilingual-MiniLM-L12-v2",{dtype:"q8",device:"wasm"});
  }).catch(e=>{loading=null;throw e});
 }
 const model=await loading;
 const vectors=(await model([question,...examples],{pooling:"mean",normalize:true})).tolist();
 const scores=vectors.slice(1).map(v=>v.reduce((sum,x,i)=>sum+x*vectors[0][i],0));
 const best=Math.max(...scores);
 return best>=0.48?scores.indexOf(best):-1;
}
