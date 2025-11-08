import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:jitsi_meet_flutter_sdk/jitsi_meet_flutter_sdk.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'dart:async';
import 'dart:io';
import 'firebase_options.dart';

// Local user database
Map<String, String> users = {"admin": "1234"};

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const ARcozyApp());
}

class ARcozyApp extends StatelessWidget {
  const ARcozyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'ARcozy',
      theme: ThemeData.dark(),
      home: const LoginScreen(),
    );
  }
}

/* ---------------------- LOGIN SCREEN ---------------------- */
class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _user = TextEditingController();
  final _pass = TextEditingController();

  void _login() {
    if (users.containsKey(_user.text.trim()) &&
        users[_user.text.trim()] == _pass.text.trim()) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (_) => SplashScreen(username: _user.text.trim()),
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("❌ Invalid username or password"),
        backgroundColor: Colors.red,
      ));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
              colors: [Colors.indigo, Colors.black],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight),
        ),
        child: Center(
          child: Card(
            color: Colors.black54,
            margin: const EdgeInsets.all(20),
            shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Form(
                key: _formKey,
                child: Column(mainAxisSize: MainAxisSize.min, children: [
                  const Text("Login",
                      style:
                      TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 20),
                  TextFormField(
                    controller: _user,
                    decoration: const InputDecoration(
                        labelText: "Username", prefixIcon: Icon(Icons.person)),
                    validator: (v) =>
                    v!.isEmpty ? "Please enter username" : null,
                  ),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: _pass,
                    obscureText: true,
                    decoration: const InputDecoration(
                        labelText: "Password", prefixIcon: Icon(Icons.lock)),
                    validator: (v) =>
                    v!.isEmpty ? "Please enter password" : null,
                  ),
                  const SizedBox(height: 20),
                  ElevatedButton(
                      onPressed: () {
                        if (_formKey.currentState!.validate()) _login();
                      },
                      style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.indigo,
                          minimumSize: const Size(double.infinity, 50)),
                      child: const Text("Login")),
                  TextButton(
                    onPressed: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (_) => const SignupScreen()));
                    },
                    child: const Text("Don't have an account? Sign up"),
                  )
                ]),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/* ---------------------- SIGNUP SCREEN ---------------------- */
class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});
  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _formKey = GlobalKey<FormState>();
  final _user = TextEditingController();
  final _pass = TextEditingController();
  final _confirm = TextEditingController();

  void _signup() {
    if (users.containsKey(_user.text.trim())) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("⚠ Username already exists"),
          backgroundColor: Colors.orange));
    } else if (_pass.text != _confirm.text) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("⚠ Passwords do not match"),
          backgroundColor: Colors.orange));
    } else {
      users[_user.text.trim()] = _pass.text.trim();
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("✅ Signup successful! Please login."),
          backgroundColor: Colors.green));
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Container(
          decoration: const BoxDecoration(
              gradient: LinearGradient(
                  colors: [Colors.indigo, Colors.black],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight)),
          child: Center(
              child: Card(
                  color: Colors.black54,
                  margin: const EdgeInsets.all(20),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20)),
                  child: Padding(
                      padding: const EdgeInsets.all(20),
                      child: Form(
                          key: _formKey,
                          child: Column(mainAxisSize: MainAxisSize.min, children: [
                            const Text("Sign Up",
                                style: TextStyle(
                                    fontSize: 28, fontWeight: FontWeight.bold)),
                            const SizedBox(height: 20),
                            TextFormField(
                                controller: _user,
                                decoration: const InputDecoration(
                                    labelText: "Username",
                                    prefixIcon: Icon(Icons.person)),
                                validator: (v) =>
                                v!.isEmpty ? "Please enter username" : null),
                            const SizedBox(height: 10),
                            TextFormField(
                                controller: _pass,
                                obscureText: true,
                                decoration: const InputDecoration(
                                    labelText: "Password",
                                    prefixIcon: Icon(Icons.lock)),
                                validator: (v) =>
                                v!.isEmpty ? "Please enter password" : null),
                            const SizedBox(height: 10),
                            TextFormField(
                                controller: _confirm,
                                obscureText: true,
                                decoration: const InputDecoration(
                                    labelText: "Confirm Password",
                                    prefixIcon: Icon(Icons.lock_outline)),
                                validator: (v) => v!.isEmpty
                                    ? "Please confirm password"
                                    : null),
                            const SizedBox(height: 20),
                            ElevatedButton(
                                onPressed: () {
                                  if (_formKey.currentState!.validate()) _signup();
                                },
                                style: ElevatedButton.styleFrom(
                                    backgroundColor: Colors.indigo,
                                    minimumSize:
                                    const Size(double.infinity, 50)),
                                child: const Text("Sign Up"))
                          ]))))),
        ));
  }
}

/* ---------------------- SPLASH SCREEN ---------------------- */
class SplashScreen extends StatefulWidget {
  final String username;
  const SplashScreen({super.key, required this.username});
  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Timer(const Duration(seconds: 2), () {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
            builder: (_) => HomeScreen(username: widget.username)),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: Color(0xFF7C4DFF),
      body: Center(
          child: Text("ARcozy",
              style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                  color: Colors.white))),
    );
  }
}

/* ---------------------- HOME SCREEN ---------------------- */
class HomeScreen extends StatefulWidget {
  final String username;
  const HomeScreen({super.key, required this.username});
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  File? _profileImage;
  String? _photoUrl;

  Future<void> _captureAndUploadPhoto() async {
    final picker = ImagePicker();
    final photo = await picker.pickImage(source: ImageSource.camera);
    if (photo == null) return;

    File file = File(photo.path);

    try {
      String fileName = "uploads/${DateTime.now().millisecondsSinceEpoch}.jpg";
      UploadTask uploadTask =
      FirebaseStorage.instance.ref().child(fileName).putFile(file);
      TaskSnapshot snapshot = await uploadTask;
      String downloadUrl = await snapshot.ref.getDownloadURL();

      setState(() => _photoUrl = downloadUrl);

      String meetingId = DateTime.now().millisecondsSinceEpoch.toString();
      String meetingLink = "https://meet.jit.si/arcozy_$meetingId";

      Navigator.push(
        context,
        MaterialPageRoute(
            builder: (_) =>
                MeetingScreen(meetingUrl: meetingLink, imageUrl: downloadUrl)),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
            content: Text("❌ Upload failed: $e"),
            backgroundColor: Colors.red),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> options = [
      {"title": "Take Photo & Start Meeting", "icon": Icons.camera_alt},
      {"title": "QR Module", "icon": Icons.qr_code},
    ];

    return Scaffold(
        appBar: AppBar(
            backgroundColor: const Color(0xFF7C4DFF),
            title: Text("ARcozy - ${widget.username}")),
        body: GridView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: options.length,
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2, crossAxisSpacing: 16, mainAxisSpacing: 16),
            itemBuilder: (_, i) {
              return ElevatedButton(
                  style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: const Color(0xFF7C4DFF),
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16))),
                  onPressed: () {
                    if (i == 0) {
                      _captureAndUploadPhoto();
                    } else {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (_) =>
                                  QRModuleScreen(uploadedPhotoUrl: _photoUrl)));
                    }
                  },
                  child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(options[i]["icon"], size: 40),
                        const SizedBox(height: 10),
                        Text(options[i]["title"],
                            textAlign: TextAlign.center,
                            style:
                            const TextStyle(fontWeight: FontWeight.w500))
                      ]));
            }));
  }
}

/* ---------------------- MEETING SCREEN ---------------------- */
class MeetingScreen extends StatefulWidget {
  final String meetingUrl;
  final String imageUrl;
  const MeetingScreen(
      {super.key, required this.meetingUrl, required this.imageUrl});
  @override
  State<MeetingScreen> createState() => _MeetingScreenState();
}

class _MeetingScreenState extends State<MeetingScreen> {
  final _jitsi = JitsiMeet();

  @override
  void initState() {
    super.initState();
    _joinMeeting();
  }

  Future<void> _joinMeeting() async {
    try {
      await _jitsi.join(JitsiMeetConferenceOptions(
        room: widget.meetingUrl.split('/').last,
        configOverrides: {"startWithAudioMuted": true},
        featureFlags: {"welcomepage.enabled": false},
      ));
    } catch (e) {
      debugPrint("Meeting error: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: const Text("Meeting Room"),
            backgroundColor: const Color(0xFF7C4DFF)),
        body: Column(children: [
          Expanded(
              child: Center(
                  child: Image.network(widget.imageUrl,
                      fit: BoxFit.contain,
                      width: 250,
                      errorBuilder: (_, __, ___) =>
                      const Text("❌ Image could not load")))),
          const Divider(),
          const Text("Meeting in progress...",
              style: TextStyle(fontSize: 16, color: Colors.white70)),
          const SizedBox(height: 10),
          ElevatedButton.icon(
              onPressed: () => Navigator.pop(context),
              icon: const Icon(Icons.exit_to_app),
              label: const Text("Leave Meeting"),
              style:
              ElevatedButton.styleFrom(backgroundColor: Colors.redAccent)),
          const SizedBox(height: 20)
        ]));
  }
}

/* ---------------------- QR MODULE ---------------------- */
class QRModuleScreen extends StatefulWidget {
  final String? uploadedPhotoUrl;
  const QRModuleScreen({super.key, this.uploadedPhotoUrl});
  @override
  State<QRModuleScreen> createState() => _QRModuleScreenState();
}

class _QRModuleScreenState extends State<QRModuleScreen> {
  bool scanning = false;
  String? scannedUrl;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text("QR Module")),
        body: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(children: [
              if (widget.uploadedPhotoUrl != null) ...[
                const Text("Your Uploaded Photo QR:",
                    style:
                    TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                const SizedBox(height: 10),
                QrImageView(
                    data: widget.uploadedPhotoUrl!,
                    version: QrVersions.auto,
                    size: 200,
                    backgroundColor: Colors.black,
                    foregroundColor: Colors.white),
              ],
              const SizedBox(height: 20),
              ElevatedButton(
                  onPressed: () => setState(() => scanning = true),
                  child: const Text("Scan QR")),
              const SizedBox(height: 20),
              if (scanning)
                Expanded(
                    child: MobileScanner(onDetect: (capture) {
                      for (final barcode in capture.barcodes) {
                        if (barcode.rawValue != null) {
                          setState(() {
                            scannedUrl = barcode.rawValue;
                            scanning = false;
                          });
                        }
                      }
                    })),
              if (scannedUrl != null) ...[
                const SizedBox(height: 20),
                const Text("Scanned Image:",
                    style: TextStyle(fontWeight: FontWeight.bold)),
                const SizedBox(height: 10),
                Image.network(scannedUrl!,
                    height: 200,
                    errorBuilder: (_, __, ___) =>
                    const Text("❌ Invalid QR data")),
              ]
            ])));
  }
}
