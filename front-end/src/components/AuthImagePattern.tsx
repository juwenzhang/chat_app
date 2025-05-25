import React from "react";

interface AuthImagePatternProps {
  children?: React.ReactNode;
  title: string;
  subtitle: string;
  theme: "light" | "dark"; 
}

const AuthImagePattern: React.FC<AuthImagePatternProps> = (props: AuthImagePatternProps) => {
  const { title, subtitle, theme } = props;
  const themeGroup = {
    light: {
      even: "#b4cdf5",
      odd: "#81a1d5"
    },
    dark: {
      even: "#060606",
      odd: "#3a3939"
    }
  }
  // const [colors, setColors] = useState(themeGroup[props.theme || "light"]);

  return (
    <React.Fragment>
      <div className="m-0 lg:flex items-center justify-center p-0 box-border"> 
        <div className="max-w-xs text-center">
          <div className="grid grid-cols-3 gap-1 mb-3"> 
            {[...Array(9)].map((_, i) => {
              return (
                <div 
                  key={i} 
                  className="aspect-square rounded-lg" 
                  style={{
                    backgroundColor: i % 2 === 0 ? themeGroup[theme].even : themeGroup[theme].odd,
                    transition: 'background-color 1s ease',
                    opacity: 0.5, 
                  }}
                >
                </div>
              )
            })}
          </div>
          <h2 className="text-lg font-bold mb-2 box-border">{title}</h2> 
          <p className="text-xs text-base-content/60">{subtitle}</p> {/* 减小副标题字体大小 */}
        </div>
      </div>
    </React.Fragment>
  )
}

export default AuthImagePattern;