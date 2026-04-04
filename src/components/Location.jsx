import React from 'react';
import { MapPin, Clock, Navigation } from 'lucide-react';

const Location = () => {
  return (
    <section id="location" className="py-24 bg-brand-bgMain scroll-mt-38">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 grid grid-cols-1 lg:grid-cols-2">
          
          {/* Map Embed */}
          <div className="h-80 lg:h-auto min-h-[400px] bg-gray-200 relative">
            <iframe 
              src="https://maps.google.com/maps?q=Kopi%20Bude%20Pakde%20Jakarta%20Timur&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="Kopi Bude Pakde Location"
            ></iframe>
          </div>

          {/* Info Details */}
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-8">
              Mampir <span className="text-brand-primary">Ngopi</span>
            </h2>
            
            <div className="space-y-8 mb-10">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-brand-primary/10 p-3 rounded-full text-brand-primary shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-brand-text mb-1">Alamat Kedai</h4>
                  <p className="text-brand-muted leading-relaxed">
                    Jl. Kwini No.25a, RT.5/RW.3, Balekambang, Kec. Kramat jati,<br />
                    Jakarta Timur, 13530
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-brand-primary/10 p-3 rounded-full text-brand-primary shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-brand-text mb-1">Jam Operasional</h4>
                  <p className="text-brand-muted">
                    Senin - Minggu : 09.00 - 22.00<br />
                  </p>
                </div>
              </div>
            </div>

            <a 
              href="https://maps.app.goo.gl/x678KSFMeV85itZc9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-auto w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-xl font-bold text-lg hover:bg-brand-hover shadow-lg shadow-brand-primary/30 transition-all transform hover:-translate-y-1"
            >
              <Navigation size={20} />
              Buka di Google Maps
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Location;
