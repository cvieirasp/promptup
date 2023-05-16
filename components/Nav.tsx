'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { BuiltInProviderType } from "next-auth/providers";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.png" alt="Logo da Promptup" width={45} height={45} className="object-contain" />
        <p className="my-logo-text">Promptup</p>
      </Link>

      {/* Navegação Desktop */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="my-btn-black">
              Criar Prompt
            </Link>
            <button type="button" onClick={() => signOut()} className="my-btn-outline">
              Sair
            </button>
            <Link href="/profile">
              <Image src={`${session.user.image}`} alt="Imagem do Perfil" width={35} height={35} className="rounded-full" />
            </Link>
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="my-btn-black">
                Entrar
              </button>
            ))}
          </>
        )}
      </div>

      {/* Navegação Desktop */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image src={`${session.user.image}`} alt="Imagem do Perfil" width={35} height={35} className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)} />

            {toggleDropdown && (
              <div className="my-dropdown">
                <Link href="/profile" className="my-dropdown-link" onClick={() => setToggleDropdown(false)}>
                  Meu Perfil
                </Link>
                <Link href="/create-prompt" className="my-dropdown-link" onClick={() => setToggleDropdown(false)}>
                  Criar Prompt
                </Link>
                <button type="button" className="mt-5 w-full my-btn-black" onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                }}>
                  Sair
                </button>
              </div>
            )}
          </div>
        ): (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="my-btn-black">
                Entrar
              </button>
            ))}
          </>
        )}
      </div>

    </nav>
  );
}

export default Nav;
