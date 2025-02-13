module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
        card: '12px',
        input: '8px',
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
        redBackground: '#ff4d4d',
        whiteBox: '#ffffff',
        greenBorder: '#28a745',
        redBorder: '#dc3545',
        errorText: '#dc3545',
        buttonGradientStart: '#ff7eb3',
        buttonGradientEnd: '#ff758c',
        buttonHoverStart: '#ff5e78',
        buttonHoverEnd: '#ff3c6a',
  		},
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px rgba(0, 0, 0, 0.3)',
      },
      spacing: {
        cardPadding: '10px',
        inputPadding: '12px',
        buttonPadding: '12px',
      },
      transitionProperty: {
        transform: 'transform',
        background: 'background',
      },
      transitionDuration: {
        transform: '0.3s',
        background: '0.3s',
      },
      transitionTimingFunction: {
        easeInOut: 'ease-in-out',
      },
      scale: {
        102: '1.02',
        105: '1.05',
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

