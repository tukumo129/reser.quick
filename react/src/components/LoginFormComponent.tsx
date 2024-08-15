import { useLoginForm } from "../container/LoginFormContainer";

export function LoginForm() {
  const { loginData, handleSubmit, onSubmit } = useLoginForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-backColor py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl text-fontBase">
            ログイン
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                メールアドレス
              </label>
              <input
                {...loginData("email")}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-borderColor placeholder-push text-fontBase rounded-t-md focus:outline-none focus:ring-subMain focus:border-subMain focus:z-10 sm:text-sm"
                placeholder="メールアドレス"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                パスワード
              </label>
              <input
                {...loginData("password")}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-borderColor placeholder-push text-fontBase rounded-b-md focus:outline-none focus:ring-subMain focus:border-subMain focus:z-10 sm:text-sm"
                placeholder="パスワード"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-borderColor rounded-md shadow-sm text-sm font-medium text-fontBase bg-base focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
