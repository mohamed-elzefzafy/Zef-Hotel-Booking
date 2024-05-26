

const Footer = () => {
  return (
    <div className="bg-blue-800 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <span className=" md:text-3xl text-white font-bold tracking-tight">
          zef-hotel-booking.com
        </span>

        <span className="text-white font-bold tracking-tight flex gap-2 md:gap-4 text-sm">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of services</p>

        </span>
      </div>
      
    </div>
  )
}

export default Footer