const AuthLayout = ({children}: {children:React.ReactNode}) => {
    return ( 
        <div className="h-full bg-gray-300">
            {children}
        </div>
     );
}
 
export default AuthLayout;