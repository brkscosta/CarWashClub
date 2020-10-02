export function signIn() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve({
        token: "nsoasndfansdfasdmfam9asfma",
        user: {
          name: "Joanã",
          email: "joanacosta97@gmail.com",
        },
      });
    }, 2000);
  });
}
