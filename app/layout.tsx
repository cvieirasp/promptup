import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: 'Promptup',
    description: 'Descubra & Compartilhe Prompts de IA',
};

const RootLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <html lang="pt-br">
        <body>
            <Provider>
                <div className="my-main">
                    <div className="my-gradient"></div>
                </div>
                <main className="my-app">
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;
