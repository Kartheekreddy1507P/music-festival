import java.util.Scanner;

// ===================== COACHELLA 2026 - DSA FULL SIMULATION =====================
class CoachellaDSA {

    // =================== MODELS ===================
    static class Artist {
        String name, stage, day;
        int favorites;
        Artist(String name, String stage, String day) {
            this.name = name; this.stage = stage; this.day = day; this.favorites = 0;
        }
    }

    static class Ticket {
        String type; int price, quantity;
        Ticket(String type, int price, int quantity) {
            this.type = type; this.price = price; this.quantity = quantity;
        }
    }

    static class Food {
        String name, category; int price;
        Food(String name, String category, int price) {
            this.name = name; this.category = category; this.price = price;
        }
    }

    static class Merch {
        String name, type; int price;
        Merch(String name, String type, int price) {
            this.name = name; this.type = type; this.price = price;
        }
    }

    // =================== USERS HASH TABLE ===================
    static class User {
        String username, password;
        User(String u, String p){ username=u; password=p; }
    }

    static class HashTable {
        User[] table; int size;
        HashTable(int s){ table = new User[s]; size=s; }

        int hash(String key){ return Math.abs(key.hashCode())%size; }

        void addUser(String u, String p){
            int idx = hash(u);
            while(table[idx]!=null) idx = (idx+1)%size;
            table[idx] = new User(u,p);
        }

        boolean login(String u, String p){
            int idx = hash(u); int start=idx;
            while(table[idx]!=null){
                if(table[idx].username.equals(u) && table[idx].password.equals(p)) return true;
                idx = (idx+1)%size;
                if(idx==start) break;
            }
            return false;
        }
    }

    static HashTable users = new HashTable(100);

    // =================== DATA ===================
    static Artist[] artists = {
        new Artist("The Weeknd","Coachella Stage","Fri"),
        new Artist("Dua Lipa","Coachella Stage","Sat"),
        new Artist("Drake","Sahara Stage","Sun"),
        new Artist("Billie Eilish","Outdoor Theatre","Fri"),
        new Artist("Imagine Dragons","Yuma Stage","Sat")
    };

    static Ticket[] tickets = {
        new Ticket("General Admission",5000,50),
        new Ticket("VIP",12000,20),
        new Ticket("VVIP",25000,10)
    };

    static Food[] foods = {
        new Food("Taco","Mains",300),
        new Food("Vegan Salad","Vegan",250),
        new Food("Coke","Drinks",100),
        new Food("Churros","Desserts",150)
    };

    static Merch[] merchs = {
        new Merch("T-shirt","Apparel",800),
        new Merch("Cap","Accessories",500),
        new Merch("Poster","Exclusive",300)
    };

    // =================== CART - STACK ===================
    static class Stack {
        String[] items; int top;
        Stack(int size){ items = new String[size]; top=-1;}
        void push(String item){ if(top<items.length-1) items[++top]=item; else System.out.println("Cart full!"); }
        String pop(){ if(top>=0) return items[top--]; else return null;}
        boolean isEmpty(){ return top==-1;}
        void display(){ if(top==-1) System.out.println("Cart Empty"); else {for(int i=0;i<=top;i++) System.out.println(items[i]);}}
    }
    static Stack cart = new Stack(100);

    // =================== ORDERS QUEUE ===================
    static class Queue {
        String[] items; int front,rear;
        Queue(int size){ items = new String[size]; front=0; rear=0; }
        boolean isEmpty(){ return front==rear; }
        boolean isFull(){ return rear==items.length; }
        void enqueue(String item){
            if(isFull()) System.out.println("Order queue full!");
            else items[rear++]=item;
        }
        String dequeue(){ if(!isEmpty()) return items[front++]; else return null;}
        void display(){ for(int i=front;i<rear;i++) System.out.println(items[i]); }
    }
    static Queue orderQueue = new Queue(100);

    // =================== MAX HEAP FOR FAVORITE ARTISTS ===================
    static class MaxHeap {
        Artist[] heap; int size;
        MaxHeap(int n){ heap = new Artist[n]; size=0;}
        void insert(Artist a){
            heap[size]=a;
            int i=size;
            size++;
            while(i>0 && heap[(i-1)/2].favorites < heap[i].favorites){
                Artist temp = heap[i]; heap[i]=heap[(i-1)/2]; heap[(i-1)/2]=temp;
                i=(i-1)/2;
            }
        }
        void buildHeap(Artist[] arr){
            size=arr.length;
            for(int i=0;i<size;i++) heap[i]=arr[i];
            for(int i=size/2-1;i>=0;i--) heapify(i);
        }
        void heapify(int i){
            int largest=i;
            int l=2*i+1, r=2*i+2;
            if(l<size && heap[l].favorites>heap[largest].favorites) largest=l;
            if(r<size && heap[r].favorites>heap[largest].favorites) largest=r;
            if(largest!=i){
                Artist t=heap[i]; heap[i]=heap[largest]; heap[largest]=t;
                heapify(largest);
            }
        }
        void top3(){
            System.out.println("==== TOP 3 FAVORITE ARTISTS ====");
            buildHeap(artists);
            for(int i=0;i<3 && i<size;i++) System.out.println((i+1)+". "+heap[i].name+" ❤️"+heap[i].favorites);
        }
    }

    static MaxHeap artistHeap = new MaxHeap(artists.length);

    // =================== UTILS ===================
    static Scanner sc = new Scanner(System.in);

    static void pause() {
        System.out.println("\nPress Enter to continue...");
        sc.nextLine();
    }

    static void sortArtistsByName() {
        for(int i=0;i<artists.length-1;i++)
            for(int j=0;j<artists.length-i-1;j++)
                if(artists[j].name.compareTo(artists[j+1].name)>0){
                    Artist temp=artists[j]; artists[j]=artists[j+1]; artists[j+1]=temp;
                }
    }

    static Artist searchArtistByName(String name) {
        for(Artist a:artists)
            if(a.name.equalsIgnoreCase(name)) return a;
        return null;
    }

    // =================== MENUS ===================
    static void showArtists() {
        System.out.println("\n==== ARTISTS ====");
        for(Artist a:artists) System.out.println(a.name+" - "+a.stage+" - "+a.day+" - ❤️"+a.favorites);
        artistHeap.top3();
        System.out.println("\n1. Favorite an artist\n0. Back");
        System.out.print("Choice: "); int ch=sc.nextInt(); sc.nextLine();
        if(ch==1){
            System.out.print("Enter artist name to favorite: ");
            String n = sc.nextLine();
            Artist a = searchArtistByName(n);
            if(a!=null){ a.favorites++; System.out.println(a.name+" favorited!"); }
            else System.out.println("Artist not found.");
            pause();
        }
    }

    static void showTickets() {
        System.out.println("\n==== TICKETS ====");
        for(int i=0;i<tickets.length;i++)
            System.out.println((i+1)+". "+tickets[i].type+" - ₹"+tickets[i].price+" - Available: "+tickets[i].quantity);
        System.out.print("\nSelect ticket to add to cart (0 to back): "); int ch=sc.nextInt(); sc.nextLine();
        if(ch>0 && ch<=tickets.length){
            if(tickets[ch-1].quantity>0){
                cart.push(tickets[ch-1].type);
                tickets[ch-1].quantity--;
                System.out.println("Added to cart!");
            } else System.out.println("Sold out!");
            pause();
        }
    }

    static void showFood() {
        System.out.println("\n==== FOOD ====");
        for(int i=0;i<foods.length;i++)
            System.out.println((i+1)+". "+foods[i].name+" - "+foods[i].category+" - ₹"+foods[i].price);
        System.out.print("\nSelect food to add to cart (0 to back): "); int ch=sc.nextInt(); sc.nextLine();
        if(ch>0 && ch<=foods.length){
            cart.push(foods[ch-1].name);
            System.out.println("Added to cart!");
            pause();
        }
    }

    static void showMerch() {
        System.out.println("\n==== MERCH ====");
        for(int i=0;i<merchs.length;i++)
            System.out.println((i+1)+". "+merchs[i].name+" - "+merchs[i].type+" - ₹"+merchs[i].price);
        System.out.print("\nSelect merch to add to cart (0 to back): "); int ch=sc.nextInt(); sc.nextLine();
        if(ch>0 && ch<=merchs.length){
            cart.push(merchs[ch-1].name);
            System.out.println("Added to cart!");
            pause();
        }
    }

    static void viewCart() {
        System.out.println("\n==== YOUR CART ====");
        cart.display();
        System.out.println("\n0. Back 1. Remove last item 2. Checkout");
        int ch = sc.nextInt(); sc.nextLine();
        if(ch==1){
            String removed = cart.pop();
            if(removed!=null) System.out.println(removed+" removed from cart.");
            else System.out.println("Cart empty!");
            pause();
        } else if(ch==2){
            while(!cart.isEmpty()) orderQueue.enqueue(cart.pop());
            System.out.println("Order placed! ✅");
            pause();
        }
    }

    static void viewOrdersQueue() {
        System.out.println("\n==== ORDERS QUEUE ====");
        orderQueue.display();
        pause();
    }

    static void signupLogin(){
        System.out.println("\n==== LOGIN / SIGNUP ====");
        System.out.print("1. Signup 2. Login: "); int ch=sc.nextInt(); sc.nextLine();
        if(ch==1){
            System.out.print("Enter username: "); String u=sc.nextLine();
            System.out.print("Enter password: "); String p=sc.nextLine();
            users.addUser(u,p);
            System.out.println("User created! ✅");
        } else if(ch==2){
            System.out.print("Enter username: "); String u=sc.nextLine();
            System.out.print("Enter password: "); String p=sc.nextLine();
            if(users.login(u,p)) System.out.println("Login successful! ✅");
            else System.out.println("Login failed ❌");
        }
        pause();
    }

    // =================== MAIN MENU ===================
    public static void main(String[] args) {
        while(true){
            System.out.println("\n==== COACHELLA 2026 ====");
            System.out.println("1. Signup / Login");
            System.out.println("2. View Artists");
            System.out.println("3. Sort Artists by Name");
            System.out.println("4. View Tickets");
            System.out.println("5. View Food");
            System.out.println("6. View Merch");
            System.out.println("7. View Cart");
            System.out.println("8. View Orders Queue (Admin)");
            System.out.println("0. Exit");
            System.out.print("Enter choice: ");
            int ch = sc.nextInt(); sc.nextLine();
            switch(ch){
                case 1: signupLogin(); break;
                case 2: showArtists(); break;
                case 3: sortArtistsByName(); System.out.println("Artists sorted by name."); pause(); break;
                case 4: showTickets(); break;
                case 5: showFood(); break;
                case 6: showMerch(); break;
                case 7: viewCart(); break;
                case 8: viewOrdersQueue(); break;
                case 0: System.out.println("Thanks for visiting Coachella 2026!"); return;
                default: System.out.println("Invalid choice!"); pause();
            }
        }
    }
}