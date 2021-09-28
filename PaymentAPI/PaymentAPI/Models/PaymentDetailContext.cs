using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PaymentAPI.Models
{
    //this class will be used to create the physicalcopies of the class that asre define here in dataset
    public class PaymentDetailContext : DbContext
    {
        public PaymentDetailContext(DbContextOptions<PaymentDetailContext> options): base(options) //we initialize the base class constructor with this constructor
        {
                
        }
        public DbSet<PaymentDetail> PaymentDetails { get; set; }
    }
}
