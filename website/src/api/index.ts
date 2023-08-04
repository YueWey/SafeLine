export {
    submitSampleSet,
    getSampleSet,
    getSampleSetResult,
    getSampleDetail,
    getSetupCount,
  };
  
  // http://localhost:2023
  const BASE_API = "/api";
  
  function submitSampleSet(data: {
    pocs: Array<{ content: string; tag: string }>;
    record_it: boolean;
  }) {
    return fetch(BASE_API + "/poc/list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      // credentials: "include",
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }
  
  function getSampleSet(id: string) {
    return fetch(BASE_API + "/poc/list?id=" + id).then((res) => res.json());
  }
  
  function getSampleDetail(id: string) {
    return fetch(BASE_API + "/poc/detail?id=" + id).then((res) => res.json());
  }
  
  async function getSampleSetResult(id: string, timeout: number = 60) {
    const startAt = new Date().getTime();
    const isTimeout = () => new Date().getTime() - startAt > timeout * 1000;
    const maxRetry = 20;
  
    for (let i = 0; i < maxRetry; i++) {
      const res = await fetch(BASE_API + "/poc/results?id=" + id).then((res) =>
        res.json()
      );
      if (res.code == 0 && res.data.data) {
        return { data: res.data.data, timeout: false };
      }
      if (isTimeout()) break;
      await new Promise((r) => setTimeout(r, 2000));
    }
    return { data: [], timeout: true };
  }
  
  function getSetupCount() {
    return fetch(BASE_API + "/count").then((res) => res.json());
  }
  