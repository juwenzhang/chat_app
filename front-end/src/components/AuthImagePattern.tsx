import React from "react";

interface AuthImagePatternProps {
  children?: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthImagePattern: React.FC<AuthImagePatternProps> = (props: AuthImagePatternProps) => {
  const { title, subtitle } = props;
  return (
    <React.Fragment>
      <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
        <div className="max-w-md text-center">
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[...Array(9)].map((_, i) => {
              return (
                <div key={i} 
                     className={`aspect-square rounded-2xl bg-primary/10 
                     ${i % 2 === 0 ? "bg-coolgray" : "bg-dark"}`}>
                </div>
              )
            })}
          </div>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AuthImagePattern;