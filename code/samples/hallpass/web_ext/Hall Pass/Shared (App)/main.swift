//
//  main.swift
//  Hall Pass
//
//  Created by Cory Finer on 2021-12-24.
//

import Foundation
#if os(iOS)
import UIKit
//typealias PlatformViewController = UIViewController

UIApplicationMain(CommandLine.argc, CommandLine.unsafeArgv, nil,
            NSStringFromClass(AppDelegateIOS.self)
)

#elseif os(macOS)
import AppKit
//typealias PlatformViewController = NSViewController

let app = UIApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
_ = NSApplicationMain(CommandLine.argc, CommandLine.unsafeArgv)

#endif
