<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Presence Assistance Tourisme</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    @stack('styles')
</head>

<body x-data="{ menu: false }" x-on:resize.window="menu = window.outerWidth > 768 ? false : menu" class="flex flex-col antialiased bg-cse">
    <div class="fixed flex items-center z-40 w-full h-16 text-gray-700 bg-white body-font top-0 shadow-lg">
        <div class="container flex flex-row flex-wrap justify-between h-14 mx-auto items-center sm:px-0 md:items-center md:flex-row lg:pr-6">
            <nav class="flex items-center justify-between flex-wrap">
                <div class="flex items-center flex-none pl-6 md:ml-4 lg:pl-0">
                    <a href="/">
                        <img src="/images/logo-presence2.svg" alt="Presence Assistance Tourisme" width="183" height="40" />
                    </a>
                </div>
                <div id="main-nav" class="hidden items-center w-auto px-6 lg:flex">
                    <div class="flex flex-col items-stretch mx-4 mb-4 divide-y divide-gray-300 text-sm sm:hover:bg-white lg:flex-row lg:h-12 lg:mb-0 lg:mx-0 lg:divide-y-0">
                        <a href="/" class="menu-link">
                            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </a>
                        <a href="/a-propos" class="menu-link">A Propos</a>
                        <a href="/faq" class="menu-link">FAQ</a>
                        <a href="/contactez-nous" class="menu-link">Contactez-nous</a>
                    </div>
                </div>
                <div x-ref="dropdown" x-show="menu" @click.away="menu=false" id="mobile-nav" class="absolute top-16 bg-white w-full flex-grow items-center shadow-lg" x-cloak>
                    <div class="flex flex-col items-stretch mx-4 mb-4 divide-y divide-gray-300 text-sm sm:hover:bg-white lg:flex-row lg:h-12 lg:mb-0 lg:mx-0 lg:divide-y-0">
                        <a href="/a-propos" class="menu-link">A Propos</a>
                        <a href="/faq" class="menu-link">FAQ</a>
                        <a href="/contactez-nous" class="menu-link">Contactez-nous</a>
                    </div>
                </div>
            </nav>
            <div class="hidden items-center pr-4 py-2 ml-auto font-semibold text-black sm:flex">
                <div class="pr-2 text-cse">
                    <a href="tel:0155904715">
                        <svg width="30" height="30" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z">
                            </path>
                        </svg>
                    </a>
                </div>
                <div class="text-xs font-extralight leading-3">
                    Besoin d'aide&nbsp;?<br />
                    <span class="text-lg font-extrabold">01&nbsp;55&nbsp;90&nbsp;47&nbsp;15</span>
                </div>
            </div>
            <img src="/images/cse-lignes.svg" class="hidden sm:inline-block" alt="CSE Lignes" width="58" height="40">
            <div class="block lg:hidden">
                <button @click="menu = true" class="navbar-burger flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
                    <svg class="fill-current h-6 w-6 text-cse" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
    <div class="relative min-h-full mt-14 bg-gray-100">
        @yield('content')
    </div>
    <footer class="bg-cse">
        <div class="container text-sm px-4 py-4 mx-auto text-center text-white">
            ©&nbsp;Presence Assistance Tourisme
            - <a href="/mentions-legales" class="text-center text-white">Mentions légales</a>
            - <a href="/politique-de-confidentialite" class="text-center text-white">politique de confidentialité</a>
            - Design&nbsp;: Winkomdesign
        </div>
    </footer>

    <script src="{{ mix('js/app.js') }}" defer></script>
    @stack('scripts')
</body>

</html>